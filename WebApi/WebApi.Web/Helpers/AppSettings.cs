namespace WebApi.Web.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        
        public string Issuer { get; set; }

        public string Audience { get; set; }

        public int Expiration { get; set; }

        public string FbAppId { get; set; }

        public string FbAppSecret { get; set; }
    }
}
