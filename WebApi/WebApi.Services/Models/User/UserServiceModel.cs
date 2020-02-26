namespace WebApi.Services.Models.User
{
    using Data.Models.Users;
    using WebApi.Common.Mapping;

    public class UserServiceModel: IMapFrom<ApplicationUser>
    {
        public string Email { get; set; }
    }
}
