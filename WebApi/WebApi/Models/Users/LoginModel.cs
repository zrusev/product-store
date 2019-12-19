﻿namespace WebApi.Web.Models.Users
{
    using System.ComponentModel.DataAnnotations;

    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
