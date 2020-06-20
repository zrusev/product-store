namespace StoreApi.Web.Infrastructure
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using System;
    using System.Threading.Tasks;
    using WebApi.Data.Models.Users;
    using WebApi.Web;

    public static class DataCollectionExtensions
    {
        public static async Task UseDataSeed(this IApplicationBuilder app, IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var _roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var _userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            var roles = new[]
            {
                WebConstants.AdministratorRole,
                WebConstants.EditorRole,
                WebConstants.UserRole
            };

            IdentityResult roleResult;
            foreach (var role in roles)
            {
                var roleCheck = await _roleManager.RoleExistsAsync(role);
                if (!roleCheck)
                {
                    roleResult = await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var adminEmail = configuration.GetValue<string>("AdminCredentials:Email");
            var adminPassword = configuration.GetValue<string>("AdminCredentials:Password");

            var adminUser = await _userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    Email = adminEmail,
                    UserName = adminEmail
                };

                await _userManager.CreateAsync(adminUser, adminPassword);

                await _userManager.AddToRolesAsync(adminUser, new[]
                    {
                        WebConstants.UserRole,
                        WebConstants.AdministratorRole
                    });
            }
        }
    }
}
