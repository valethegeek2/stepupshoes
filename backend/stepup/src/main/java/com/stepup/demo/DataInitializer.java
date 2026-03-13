package com.stepup.demo;

import com.stepup.demo.models.*;
import com.stepup.demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {

    UserRepository userRepository;
    ProductRepository productRepository;
    ProductVariantRepository  productVariantRepository;
    CategoryRepository  categoryRepository;
    CartItemRepository cartItemRepository;

    public DataInitializer(UserRepository userRepository,
                           ProductRepository productRepository,
                           ProductVariantRepository productVariantRepository,
                           CategoryRepository  categoryRepository,
                           CartItemRepository cartItemRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productVariantRepository = productVariantRepository;
        this.categoryRepository = categoryRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Bean
    public CommandLineRunner initializeDatabase() {
        return args -> {
            // Populate database

            // Create admin
            UserProfile adminProfile = new UserProfile();
            adminProfile.setFirstName("ADMIN");
            adminProfile.setLastName("STEPUP");
            adminProfile.setAddress("stepup.com");
            adminProfile.setPhoneNumber("69000000");
            adminProfile.setPostalCode("12345");
            adminProfile.setCity("City");
            User admin = new User();
            adminProfile.setUser(admin);
            admin.setUsername("admin");
            admin.setPassword("$2a$10$gImjzeDHCbKwGZo8UkKw6Olu5ZYT1W72g68sGOIWPrJlRbBRa8K86");
            admin.setEmail("admin@stepup.com");
            admin.setRole(Role.admin);
            admin.setProfile(adminProfile);
            admin.setCreatedAt(Instant.now());
            // Create Demo User
            UserProfile userProfile = new UserProfile();
            User user = new User();
            userProfile.setUser(user);
            user.setProfile(userProfile);
            user.setUsername("user");
            user.setPassword("$2a$10$X/gtuhqYi9u7AT99.I6aZ.fZuQ6IyK0P.WHl2bS030TYKk8Pihl5a");
            user.setEmail("user@myemail.com");
            user.setCreatedAt(Instant.now());
            user.setRole(Role.customer);
            userProfile.setFirstName("John");
            userProfile.setLastName("Doe");
            userProfile.setAddress("Main Street 12");
            userProfile.setCity("City");
            userProfile.setPhoneNumber("6789000");
            userProfile.setPostalCode("12345");

            // Save users to database
            userRepository.save(admin);
            userRepository.save(user);

            // Create Categories
            Category c_shoes = new Category();
            Category c_clothes = new Category();
            Category c_accessories = new Category();

            c_shoes.setName("Shoes");
            c_clothes.setName("Clothing");
            c_accessories.setName("Accessories");

            // Products
            Product p1 = new Product();
            Product p2 = new Product();
            Product p3 = new Product();
            Product p4 = new Product();
            Product p5 = new Product();
            Product p6 = new Product();
            Product p7 = new Product();

            // Product Variants for Product 1
            ProductVariant p1_v1 = new ProductVariant();
            ProductVariant p1_v2 = new ProductVariant();
            p1_v1.setProduct(p1);
            p1_v1.setColor("Black");
            p1_v1.setSize("42");
            p1_v1.setStock(10);
            p1_v1.setPriceAdjustment(0.0F);
            p1_v1.setIsAvailable(true);

            p1_v2.setProduct(p1);
            p1_v2.setColor("White");
            p1_v2.setSize("43");
            p1_v2.setStock(8);
            p1_v2.setPriceAdjustment(0.0F);
            p1_v2.setIsAvailable(true);

            Set<ProductVariant> productVariants = new HashSet<>();
            productVariants.add(p1_v1);
            productVariants.add(p1_v2);
            p1.setVariants(productVariants);
            // Product Variants for Product 2
            ProductVariant p2_v1 = new ProductVariant();
            ProductVariant p2_v2 = new ProductVariant();
            //            (2, 'Black', '42', 5, 10, TRUE),   -- 10 added to base price
//            (2, 'White', '44', 3, 15, TRUE),
//            (3, 'Blue', 'M', 20, 0, TRUE),
//            (3, 'Red', 'L', 15, 0, TRUE),
//            (4, 'Grey', 'S', 12, 0, TRUE),
//            (4, 'Black', 'M', 5, 0, TRUE),
//            (5, 'Lime/Blue', '42', 4, 10, TRUE),
//            (6, 'White', 'OneSize', 50, 0, TRUE);
            // Product Variants for Product 3
            ProductVariant p3_v1 = new ProductVariant();
            ProductVariant p3_v2 = new ProductVariant();
            // Product Variants for Product 4
            ProductVariant p4_v1 = new ProductVariant();
            ProductVariant p4_v2 = new ProductVariant();
            // Product Variants for Product 5
            ProductVariant p5_v1 = new ProductVariant();
            // Product Variants for Product 6
            ProductVariant p6_v1 = new ProductVariant();
            // @TODO: make the rest of the variants


            // Product 1
            p1.setCategory(c_shoes);
            p1.setName("Nike Air Zoom");
            p1.setBrand("Nike");
            p1.setDescription("Lightweight running shoes");
            p1.setTags("nike,running,zoom");
            p1.setBasePrice(120.0F);
            p1.setGender(Gender.MEN);
            p1.setIsActive(true);
            p1.setProductImage("default.png");
            p1.setReviews(34L);
            p1.setRating(4.3F);

            // Product 2
            p2.setCategory(c_shoes);
            p2.setName("Addidas Ultraboost");
            p2.setBrand("Addidas");
            p2.setDescription("Premium running shoes with comfort");
            p2.setTags("addidas,running,boost");
            p2.setBasePrice(150.0F);
            p2.setGender(Gender.MEN);
            p2.setIsActive(true);
            p2.setProductImage("default.png");
            p2.setReviews(68L);
            p2.setRating(3.4F);

            // Product 3
            p3.setCategory(c_clothes);
            p3.setName("Puma Training T-Shirt");
            p3.setBrand("Puma");
            p3.setDescription("Breathable training tee");
            p3.setTags("puma,training,shirt");
            p3.setBasePrice(40.0F);
            p3.setGender(Gender.UNISEX);
            p3.setIsActive(true);
            p3.setProductImage("default.png");
            p3.setReviews(55L);
            p3.setRating(5.0F);

            // Product 4
            p4.setCategory(c_clothes);
            p4.setName("Under Armour Hoodie");
            p4.setBrand("Under Armour");
            p4.setDescription("Warm hoodie for workouts");
            p4.setTags("underarmour,hoodie");
            p4.setBasePrice(70.0F);
            p4.setGender(Gender.WOMEN);
            p4.setIsActive(true);
            p4.setProductImage("default.png");
            p4.setReviews(6L);
            p4.setRating(4.0F);

            // Product 5
            p5.setCategory(c_shoes);
            p5.setName("Under Armor Xtrail");
            p5.setBrand("Under Armor");
            p5.setDescription("UA Shoes for running");
            p5.setTags("underarmour,shoes");
            p5.setBasePrice(89.99F);
            p5.setGender(Gender.WOMEN);
            p5.setIsActive(true);
            p5.setProductImage("default.png");
            p5.setReviews(12L);
            p5.setRating(2.4F);

            // Product 6
            p6.setCategory(c_accessories);
            p6.setName("Sport Socks");
            p6.setBrand("Unbranded");
            p6.setDescription("Pack of 3 ankle high socks");
            p6.setTags("socks,accessory");
            p6.setBasePrice(15.0F);
            p6.setGender(Gender.UNISEX);
            p6.setIsActive(true);
            p6.setProductImage("default.png");
            p6.setReviews(12L);
            p6.setRating(2.0F);

            // Product 7
            p7.setCategory(c_accessories);
            p7.setName("Girls school backpack");
            p7.setBrand("Disney Official");
            p7.setDescription("Disney inspired girls school backpack");
            p7.setTags("disney,school,backpack,girls");
            p7.setBasePrice(39.99F);
            p7.setGender(Gender.GIRLS);
            p7.setIsActive(false);
            p7.setProductImage("default.png");

            List<Product> shoeProducts = new ArrayList<>();
            shoeProducts.add(p1);
            shoeProducts.add(p2);
            shoeProducts.add(p5);
            c_shoes.setProducts(shoeProducts);

            List<Product> clothesProducts = new ArrayList<>();
            clothesProducts.add(p3);
            clothesProducts.add(p4);
            c_clothes.setProducts(clothesProducts);

            List<Product> accessoriesProducts = new ArrayList<>();
            accessoriesProducts.add(p6);
            accessoriesProducts.add(p7);
            c_accessories.setProducts(accessoriesProducts);

            categoryRepository.save(c_shoes);
            categoryRepository.save(c_clothes);
            categoryRepository.save(c_accessories);

            productVariantRepository.save(p1_v1);
            productVariantRepository.save(p1_v2);

            // Save products to database
            productRepository.save(p1);
            productRepository.save(p2);
            productRepository.save(p3);
            productRepository.save(p4);
            productRepository.save(p5);
            productRepository.save(p6);
            productRepository.save(p7);



        };
    }

}
