export var mockToken = null;
const Products = [
	{
		"id": 1,
		"name": "Xtra Boost",
		"description": "Running shoes for everyday",
		"brand": "Adidas",
		"productImage": "default.png",
		"tags": "running,shoes,men,new,sale2025",
		"basePrice": 79.99,
		"reviews": 124,
		"rating": 3.6,
		"gender": "MEN",
		"category": {
			"id": 1,
			"name": "Shoes"
		},
		"numberOfVariants": 3,
		"isActive": true
	},
	{
		"id": 2,
		"name": "Air Zoom",
		"description": "Running shoes for everyday",
		"brand": "Nike",
		"productImage": "default.png",
		"tags": "running,shoes,men,new,sale2025",
		"basePrice": 69.99,
		"reviews": 80,
		"rating": 4,
		"gender": "MEN",
		"category": {
			"id": 1,
			"name": "Shoes"
		},
		"numberOfVariants": 2,
		"isActive": true
	}
];
const Variants = [
	{
		"id": 0,
		"color": "Blue",
		"size": "42",
		"stock": 6,
		"priceAdjustment": 7.89,
		"is_available": true
	},
	{
		"id": 1,
		"color": "Blue",
		"size": "44",
		"stock": 4,
		"priceAdjustment": 8.89,
		"is_available": true
	}
];
const Categories = [
	{
		"id": 0,
		"name": "Shoes"
	},
	{
		"id": 1,
		"name": "Clothes"
	},
	{
		"id": 2,
		"name": "Accessories"
	},
	{
		"id": 3,
		"name": "Accessories/Bags"
	},
	{
		"id": 4,
		"name": "Accessories/Gym Tools"
	}
];
const Users = [
	{
		"id": 0,
		"username": "admin",
		"password": "admin123",
		"email": "admin@stepup.com",
		"role": "ADMIN",
		"createdAt": "2026-03-15 17:16:58.29136+00"
	},
	{
		"id": 1,
		"username": "testUser",
		"password": "password",
		"email": "user@stepup.com",
		"role": "User",
		"createdAt": "2026-03-16 17:16:58.29136+00"
	}
];
export const mockDB = {
	"Comment": "These are example data for the Objects served by the endpoints",
	products: Products,
	categories: Categories,
	users: Users,
	variants: Variants,
	"RegisterRequestDTO": {
		"username": "user",
		"email": "my@email.com",
		"password": "password",
    	"firstName": "John",
    	"lastName": "Doe"
	},
	"UserProfile": {
		"id": 0,
		"firstName": "Admin",
		"lastName": "Admin"
	}
}

export async function login(username="admin", password="admin123") {
  if(username === "admin" && password === "admin123"){
    mockToken = "token";
    return username;
  }
  throw new Error("Username not found");
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// GET /products
export async function getProducts(page = 0, size = 10) {

	if(!mockToken){
    throw new Error("Not logged in");
  }

  await delay(200);

  const start = page * size;
  const end = start + size;

  const contents = mockDB.products.slice(start, end);

  return {
    contents,
    pageNumber: page,
    pageSize: size,
    totalPages: Math.ceil(mockDB.products.length / size),
    totalElements: mockDB.products.length,
    lastPage: end >= mockDB.products.length
  };
}


// GET /products/{id}
export async function getProduct(id) {

  await delay(100);

  return mockDB.products.find(
    p => p.productId === id
  );
}


// POST /products
export async function createProduct(product) {
  if(!mockToken){
    throw new Error("Not logged in");
  }
  await delay(150);

  const newId = Math.max(...mockDB.products.map(p => p.id)) + 1;

  const newProduct = {
    ...product,
    id: newId
  };

  mockDB.products.push(newProduct);

  return newProduct;
}


// PUT /products/{id}
export async function updateProduct(id, updatedData) {

  await delay(150);

  const index = mockDB.products.findIndex(
    p => p.productId === id
  );

  if (index === -1) {
    throw new Error("Product not found");
  }

  mockDB.products[index] = {
    ...mockDB.products[index],
    ...updatedData
  };

  return mockDB.products[index];
}


// DELETE /products/{id}
export async function deleteProduct(id) {

  await delay(100);

  const index = mockDB.products.findIndex(
    p => p.productId === id
  );

  if (index !== -1) {
    mockDB.products.splice(index, 1);
  }

  return { message: "Deleted" };
}