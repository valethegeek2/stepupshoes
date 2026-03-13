package com.stepup.demo;


import com.stepup.demo.models.Product;
import com.stepup.demo.models.ProductVariant;
import com.stepup.demo.models.dtos.ProductDTO;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        Converter<Set<ProductVariant>, Integer> variantsCountConverter =
                ctx -> ctx.getSource() == null ? 0 : ctx.getSource().size();

        mapper.typeMap(Product.class, ProductDTO.class)
                .addMappings(m -> m.using(variantsCountConverter)
                        .map(Product::getVariants, ProductDTO::setNumberOfVariants));

        return mapper;
    }
}
