namespace WebApi.Web.Models.Users
{
    using System;
    using System.ComponentModel.DataAnnotations;    
    
    public class TokenModel
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public DateTime Expiration { get; set; }

        public bool Success { get; set; }
    }
}
