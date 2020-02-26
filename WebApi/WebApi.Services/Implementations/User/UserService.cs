namespace WebApi.Services
{
    using Models.User;
    using System.Collections.Generic;
    using System.Linq;
    using WebApi.Data;

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        public UserService(ApplicationDbContext db)
        {
            _db = db;
        }

        public IEnumerable<UserServiceModel> Users()
            => _db
                .Users
                .Select(u => new UserServiceModel
                {
                    Email = u.Email
                })
                .ToList();
        
    }
}
