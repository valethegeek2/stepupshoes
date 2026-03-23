package com.stepup.demo.controllers;

import com.stepup.demo.AppConstants;
import com.stepup.demo.models.Category;
import com.stepup.demo.models.dtos.CategoryDTO;
import com.stepup.demo.models.dtos.PagedResponse;
import com.stepup.demo.services.AdminService;
import com.stepup.demo.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoriesController {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<PagedResponse<CategoryDTO, Long>> getAllCategories(
            @RequestParam(name="pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name="pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name="sortBy", defaultValue = AppConstants.SORT_BY, required = false) String sortBy,
            @RequestParam(name="sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        PagedResponse<Category, Long> categoriesResponse = adminService.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
        PagedResponse<CategoryDTO, Long> dtoResponse =  new  PagedResponse<>();
        dtoResponse.setContents(categoriesResponse.getContents()
                .stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .toList());
        dtoResponse.setPageNumber(categoriesResponse.getPageNumber());
        dtoResponse.setPageSize(categoriesResponse.getPageSize());
        dtoResponse.setTotalElements(categoriesResponse.getTotalElements());
        dtoResponse.setTotalPages(categoriesResponse.getTotalPages());
        dtoResponse.setLastPage(categoriesResponse.isLastPage());
        return new ResponseEntity<>(dtoResponse, HttpStatus.OK);
    }
}
