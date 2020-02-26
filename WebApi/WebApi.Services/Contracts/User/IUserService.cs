namespace WebApi.Services
{
    using Services.Common;
    using System.Collections.Generic;
    using WebApi.Data.Models.Users;

    public interface IUserService: IScopedService
    {
        public IEnumerable<ApplicationUser> Users();
    }
}
