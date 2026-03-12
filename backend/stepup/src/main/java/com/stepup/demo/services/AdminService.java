package com.stepup.demo.services;

import com.stepup.demo.models.Category;
import com.stepup.demo.models.Product;
import com.stepup.demo.models.dtos.PagedResponse;
import org.jspecify.annotations.Nullable;

public interface AdminService {
    public PagedResponse<Product, Long> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    PagedResponse<Category, Long> getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

}
