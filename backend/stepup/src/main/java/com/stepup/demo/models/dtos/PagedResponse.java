package com.stepup.demo.models.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stepup.demo.exceptions.APIException;
import com.stepup.demo.models.Product;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @brief Represents a response with additional metadata regarding paging
 * @param <T> Is the class of the paged response content
 * @param <ID> The type of the provided class's ID
 * To use this class:
 *            1) Create an object: PagedResponse response = new PagedResponse
 *            2) response.setJpaRepository( jpaRepository, e.g. productRepository);
 *            3) response.processNextPage();
 *            4) return response;
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponse<T, ID> {
    private List<T> contents; /** The contents of the response */
    @JsonIgnore
    private JpaRepository<T, ID> jpaRepository;
    private Integer pageNumber;
    private Integer pageSize;
    private Integer totalPages;
    private Long totalElements;
    private boolean lastPage;

    public void processNextPage(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<T> TPage = jpaRepository.findAll(pageDetails);
        this.pageNumber = TPage.getNumber();
        this.pageSize = TPage.getSize();
        totalPages = TPage.getTotalPages();
        totalElements = TPage.getTotalElements();
        lastPage = TPage.isLast();
        contents = TPage.getContent();
    }

    public void processNextPageWithSpecs(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, Specification spec) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        try {
            Page<T> TPage = ((JpaSpecificationExecutor) jpaRepository).findAll(spec, pageDetails);
            this.pageNumber = TPage.getNumber();
            this.pageSize = TPage.getSize();
            totalPages = TPage.getTotalPages();
            totalElements = TPage.getTotalElements();
            lastPage = TPage.isLast();
            contents = TPage.getContent();
        } catch (RuntimeException re) {
            throw new APIException("Error while processing next page jpaSpecification");
        }
    }
}
