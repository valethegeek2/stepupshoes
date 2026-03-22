package com.stepup.demo.controllers;

import com.stepup.demo.AppConstants;
import com.stepup.demo.models.*;
import com.stepup.demo.models.dtos.*;
import com.stepup.demo.services.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.stepup.demo.models.dtos.OrderDTO;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private OrderService orderService;

    // ======================== PRODUCTS ==============================
    @GetMapping("/products")
    public ResponseEntity<PagedResponse<ProductDTO, Long>> getAllProducts(
            @RequestParam(name="pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name="pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name="sortBy", defaultValue = AppConstants.SORT_PRODUCTS_BY, required = false) String sortBy,
            @RequestParam(name="sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        PagedResponse<Product, Long> pagedResponse = adminService.getAllProducts(pageNumber, pageSize, sortBy, sortOrder);
        PagedResponse<ProductDTO, Long> dtoResponse = new  PagedResponse<>();
        dtoResponse.setContents(pagedResponse.getContents().stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList());
        dtoResponse.setPageNumber(pagedResponse.getPageNumber());
        dtoResponse.setPageSize(pagedResponse.getPageSize());
        dtoResponse.setTotalElements(pagedResponse.getTotalElements());
        dtoResponse.setTotalPages(pagedResponse.getTotalPages());
        dtoResponse.setLastPage(pagedResponse.isLastPage());
        return new ResponseEntity<>(dtoResponse, HttpStatus.OK);
    }
    @PostMapping("/products")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        ProductDTO response = modelMapper.map(productService.createProduct(product), ProductDTO.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable long productId) {
        Product updatedProduct = modelMapper.map(productDTO, Product.class);
        ProductDTO response = modelMapper.map(productService.updateProduct(productId, updatedProduct), ProductDTO.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<Long> deleteProduct(@PathVariable long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(productId, HttpStatus.OK);
    }

    @PutMapping("/products/{productId}/images")
    public ResponseEntity<Product> uploadImage(
            @PathVariable Long productId,
            @RequestParam("image") MultipartFile image) throws IOException {
        Product updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @GetMapping("/products/images")
    public ResponseEntity<List<String>> getAllProductImages() {
        List<String> listOfImages = productService.getAllProductImages();

        return new ResponseEntity<>(listOfImages,  HttpStatus.OK);
    }

    // ===============================================================

    // =================== PRODUCT VARIANTS ==========================

    @GetMapping("/products/{productId}/productVariants")
    public ResponseEntity<List<VariantDTO>> getAllProductVariantsByProductId(@PathVariable long productId) {
        List<ProductVariant> variants = productService.getAllProductVariantsByProductId(productId);
        List<VariantDTO> variantDTOS = variants.stream()
                .map(variant -> modelMapper.map(variant, VariantDTO.class))
                .toList();
        return new ResponseEntity<>(variantDTOS, HttpStatus.OK);
    }

    @PostMapping("/products/{productId}/productVariants")
    public ResponseEntity<VariantDTO> createProductVariant(@PathVariable long productId,
                                                           @RequestBody VariantDTO variantDTO) {
        ProductVariant productVariant = modelMapper.map(variantDTO, ProductVariant.class);
        ProductVariant updatedVariant = productService.addVariant(productId, productVariant);
        VariantDTO response = modelMapper.map(updatedVariant, VariantDTO.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/products/productVariants/{variantId}")
    public ResponseEntity<VariantDTO> updateProductVariant(@RequestBody VariantDTO variantDTO,
                                                               @PathVariable long variantId) {
        ProductVariant productVariant = modelMapper.map(variantDTO, ProductVariant.class);
        ProductVariant updatedVariant = productService.updateVariant(variantId, productVariant);
        VariantDTO response = modelMapper.map(updatedVariant, VariantDTO.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/products/productVariants/{variantId}")
    public ResponseEntity<HttpStatus> deleteProductVariant(@PathVariable long variantId) {
        productService.deleteVariant(variantId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    // ======================== CATEGORIES ===========================
    @GetMapping("/categories")
    public ResponseEntity<PagedResponse<CategoryDTO, Long>> getAllCategories(
            @RequestParam(name="pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name="pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name="sortBy", defaultValue = AppConstants.SORT_CATEGORIES_BY, required = false) String sortBy,
            @RequestParam(name="sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        PagedResponse<Category, Long> categoriesResponse = adminService.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
        PagedResponse<CategoryDTO, Long> dtoResponse =  new  PagedResponse<>();
        dtoResponse.setContents(categoriesResponse.getContents()
                .stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .toList());
        return new ResponseEntity<>(dtoResponse, HttpStatus.OK);
    }
    @PostMapping("/categories")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO category) {
        Category newCategory = modelMapper.map(category, Category.class);
        CategoryDTO response = modelMapper.map(categoryService.createCategory(newCategory),  CategoryDTO.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO category, @PathVariable long categoryId) {
        Category updateCategory = modelMapper.map(category, Category.class);
        CategoryDTO response = modelMapper.map(categoryService.updateCategory(updateCategory, categoryId), CategoryDTO.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    // ===============================================================

    // ======================== USERS ===========================
    @GetMapping("/users")
    public ResponseEntity<PagedResponse<UserDTO, Long>> getAllUsers(
            @RequestParam(name="pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name="pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name="sortBy", defaultValue = AppConstants.SORT_USERS_BY, required = false) String sortBy,
            @RequestParam(name="sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        PagedResponse<User, Long> usersList = userService.getAllUsers(pageNumber, pageSize, sortBy, sortOrder);
        PagedResponse<UserDTO, Long> dtoResponse =  new  PagedResponse<>();
        dtoResponse.setContents(usersList.getContents().stream().map(user -> modelMapper.map(user, UserDTO.class)).toList());
        dtoResponse.setTotalPages(usersList.getTotalPages());
        dtoResponse.setTotalElements(usersList.getTotalElements());
        dtoResponse.setPageSize(usersList.getPageSize());
        dtoResponse.setPageNumber(usersList.getPageNumber());
        dtoResponse.setLastPage(usersList.isLastPage());
        return new ResponseEntity<>(dtoResponse, HttpStatus.OK);
    }
    @GetMapping("/users/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(Arrays.stream(Role.values()).toList(), HttpStatus.OK);
    }
    @PostMapping("/users")
    public ResponseEntity<RegisterResponse> createUser(@RequestBody RegisterRequestDTO registerRequestDTO) {
        return new ResponseEntity<>(authService.register(registerRequestDTO), HttpStatus.CREATED);
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO user, @PathVariable long userId) {
        User newUser = modelMapper.map(user, User.class);
        UserDTO response = modelMapper.map(userService.updateUser(newUser, userId), UserDTO.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    // ===============================================================


    // ======================== USER PROFILES ===========================
    @GetMapping("/users/profiles")
    public ResponseEntity<PagedResponse<UserProfileDTO, Long>> getAllUserProfiles(
            @RequestParam(name="pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name="pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name="sortBy", defaultValue = AppConstants.SORT_PROFILES_BY, required = false) String sortBy,
            @RequestParam(name="sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        PagedResponse<UserProfile, Long> pageResponse = userService.getAllUserProfiles(pageNumber, pageSize, sortBy, sortOrder);
        PagedResponse<UserProfileDTO, Long> response = new  PagedResponse<>();
        response.setContents(pageResponse.getContents().stream()
                .map(userProfile ->  modelMapper.map(userProfile, UserProfileDTO.class)).toList());
        response.setTotalPages(pageResponse.getTotalPages());
        response.setTotalElements(pageResponse.getTotalElements());
        response.setPageSize(pageResponse.getPageSize());
        response.setPageNumber(pageResponse.getPageNumber());
        response.setLastPage(pageResponse.isLastPage());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/profiles")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable long userId) {
        UserProfile profile = userService.getUserProfile(userId);
        return new ResponseEntity<>(modelMapper.map(profile, UserProfileDTO.class), HttpStatus.OK);
    }

    @PutMapping("/users/{userId}/profiles")
    public ResponseEntity<UserProfileDTO> updateUserProfile(@RequestBody UserProfile userProfile, @PathVariable long userId) {
        UserProfile updatedProfile = userService.updateProfile(userProfile, userId);
        UserProfileDTO response = modelMapper.map(updatedProfile, UserProfileDTO.class);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

            // ======================== ORDERS ===========================

    @GetMapping("/orders")
    public ResponseEntity<PagedResponse<OrderDTO, Long>> getAllOrders(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize",   defaultValue = AppConstants.PAGE_SIZE,   required = false) Integer pageSize,
            @RequestParam(name = "sortBy",     defaultValue = AppConstants.SORT_ORDERS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder",  defaultValue = AppConstants.SORT_ORDER,  required = false) String sortOrder
    ) {
        PagedResponse<Order, Long> pagedResponse = orderService.getAllOrders(pageNumber, pageSize, sortBy, sortOrder);
        PagedResponse<OrderDTO, Long> dtoResponse = new PagedResponse<>();
        dtoResponse.setContents(pagedResponse.getContents().stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList());
        dtoResponse.setPageNumber(pagedResponse.getPageNumber());
        dtoResponse.setPageSize(pagedResponse.getPageSize());
        dtoResponse.setTotalElements(pagedResponse.getTotalElements());
        dtoResponse.setTotalPages(pagedResponse.getTotalPages());
        dtoResponse.setLastPage(pagedResponse.isLastPage());
        return new ResponseEntity<>(dtoResponse, HttpStatus.OK);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable long orderId) {
        return new ResponseEntity<>(orderService.getOrderByIdAdmin(orderId), HttpStatus.OK);
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable long orderId,
            @RequestParam String status
    ) {
        return new ResponseEntity<>(orderService.updateOrderStatus(orderId, status), HttpStatus.OK);
    }

    @DeleteMapping("/orders/{orderId}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // ===============================================================

    

}
