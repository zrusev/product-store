namespace WebApi.Web.Helpers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using WebApi.Data.Models.Users;
    using WebApi.Web.Models.Users;

    public class Tokens
    {
        public static async Task<TokenModel> GenerateJwtToken(ApplicationUser user, UserManager<ApplicationUser> _userManager, AppSettings _appSettings)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.Audience,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(_appSettings.Expiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new TokenModel
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = token.ValidTo,
                Success = true
            };
        }
    }
}
