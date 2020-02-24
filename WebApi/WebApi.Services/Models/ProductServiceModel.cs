namespace WebApi.Services.Models
{
    using AutoMapper;
    using WebApi.Common.Mapping;
    using WebApi.Data.Models.Products;

    public class ProductServiceModel: IMapFrom<Product>, IMapExplicitly
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public void RegisterMappings(IProfileExpression profile)
        {
            profile
                .CreateMap<Product, ProductServiceModel>()
                .ForMember(a => a.Name, cfg => cfg.MapFrom(a => a.Name));
        }
    }
}
