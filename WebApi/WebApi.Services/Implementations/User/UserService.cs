namespace WebApi.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using WebApi.Data;
    using WebApi.Data.Models.Users;

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        public UserService(ApplicationDbContext db)
        {
            _db = db;
        }

        public IEnumerable<ApplicationUser> Users()
            => _db
                .Users
                .ToList();
        
    }
}
