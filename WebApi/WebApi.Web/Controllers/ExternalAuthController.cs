namespace WebApi.Web.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using WebApi.Data.Models.Users;
    using WebApi.Web.Helpers;
    using WebApi.Web.Models.Users;

    public class ExternalAuthController : ApplicationController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppSettings _appSettings;
        private static readonly HttpClient Client = new HttpClient();

        public ExternalAuthController(UserManager<ApplicationUser> userManager,
                                      IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost("facebook")]
        public async Task<ActionResult> Facebook(FacebookAuthViewModel model)
        {
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_appSettings.FbAppId}&client_secret={_appSettings.FbAppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);

            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid)
            {
                return BadRequest("Invalid facebook token.");
            }

            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v5.0/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            var user = await _userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                var appUser = new ApplicationUser
                {
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                };

                var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));
                
                if (!result.Succeeded) return new BadRequestObjectResult(result);
                
                await _userManager.AddClaimsAsync(appUser, new List<Claim>()
                {
                    new Claim("FirstName", userInfo.FirstName),
                    new Claim("LastName", userInfo.LastName),
                    new Claim("FacebookId", userInfo.Id.ToString()),
                    new Claim("PictureUrl1", userInfo.Picture.Data.Url)
                });
                
                //await _appDbContext.Customers.AddAsync(new Customer { IdentityId = appUser.Id, Location = "", Locale = userInfo.Locale, Gender = userInfo.Gender });
                //await _appDbContext.SaveChangesAsync();
            }

            var localUser = await _userManager.FindByEmailAsync(userInfo.Email);

            if (localUser == null)
            {
                return BadRequest("Failed to create local user account.");
            }

            var jwt = await Tokens.GenerateJwtToken(localUser, _userManager, _appSettings);

            return new OkObjectResult(jwt);
        }
    }
}