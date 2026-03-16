// BackendClasses.js

export class Category {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

export class Product {
  constructor({
    id,
    name,
    description,
    brand,
    productImage,
    tags,
    basePrice,
    reviews,
    rating,
    gender,
    category,
    numberOfVariants,
    isActive
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.productImage = productImage;
    this.tags = tags;
    this.basePrice = basePrice;
    this.reviews = reviews;
    this.rating = rating;
    this.gender = gender;
    this.category = category ? new Category(category) : null;
    this.numberOfVariants = numberOfVariants;
    this.isActive = isActive;
  }
}

export class Variant {
  constructor({
    variantId,
    color,
    size,
    stock,
    priceAdjustment,
    is_available
  }) {
    this.variantId = variantId;
    this.color = color;
    this.size = size;
    this.stock = stock;
    this.priceAdjustment = priceAdjustment;
    this.is_available = is_available;
  }
}

export class User {
  constructor({
    id,
    username,
    password,
    email,
    role,
    createdAt
  }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }
}

export class PagedResponse {
  constructor({
    contents,
    pageNumber,
    pageSize,
    totalPages,
    totalElements,
    lastPage
  }) {
    this.contents = contents;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.lastPage = lastPage;
  }
}