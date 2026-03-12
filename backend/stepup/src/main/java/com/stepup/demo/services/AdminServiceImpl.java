package com.stepup.demo.services;

import com.stepup.demo.models.Category;
import com.stepup.demo.models.Product;
import com.stepup.demo.models.dtos.PagedResponse;
import com.stepup.demo.repository.CategoryRepository;
import com.stepup.demo.repository.ProductRepository;
import org.jspecify.annotations.Nullable;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PagedResponse<Product, Long> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        PagedResponse<Product, Long> response = new PagedResponse<>();
        response.setJpaRepository(productRepository);
        response.processNextPage(pageNumber, pageSize, sortBy, sortOrder);
        return response;
    }

    @Override
    public PagedResponse<Category, Long> getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        PagedResponse<Category, Long> response = new PagedResponse<>();
        response.setJpaRepository(categoryRepository);
        response.processNextPage(pageNumber, pageSize, sortBy, sortOrder);
        return response;
    }

}
