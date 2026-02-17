package com.stepup.demo.controllers;

import com.stepup.demo.models.dtos.AdminProductDTO;
import com.stepup.demo.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminProductService;

    @GetMapping
    public ResponseEntity<List<AdminProductDTO>> getAllProducts() {
        return ResponseEntity.ok(adminProductService.getAllProducts());
    }
}
