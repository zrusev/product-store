namespace WebApi.Services
{
    using Models.User;
    using Services.Common;
    using System.Collections.Generic;

    public interface IUserService: IScopedService
    {
        public IEnumerable<UserServiceModel> Users();
    }
}
