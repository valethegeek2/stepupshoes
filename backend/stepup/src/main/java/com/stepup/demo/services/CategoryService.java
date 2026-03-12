package com.stepup.demo.services;

import com.stepup.demo.models.Category;

public interface CategoryService {

    Category createCategory(Category category);

    Category updateCategory(Category category, long categoryId);

    void deleteCategory(long categoryId);
}
