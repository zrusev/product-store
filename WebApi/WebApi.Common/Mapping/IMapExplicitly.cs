﻿namespace WebApi.Common.Mapping
{
    using AutoMapper;

    public interface IMapExplicitly
    {
        public void RegisterMappings(IProfileExpression profile);
    }
}
