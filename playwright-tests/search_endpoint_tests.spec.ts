import { test, expect } from '@playwright/test';

test('search products by gender = men', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/products/search?gender=men');

  // Status code check
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Basic assertions
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  // Check fields exist
  const product = body[0];

  expect(product).toHaveProperty('productId');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('basePrice');
  expect(product).toHaveProperty('gender');

  // Verify filtering logic
  for (const p of body) {
    expect(p.gender).toBe('MEN');
  }
});
test('search products by category = shoes', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/products/search?category=shoes');

  // Status code check
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Basic assertions
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  // Check fields exist
  const product = body[0];

  expect(product).toHaveProperty('productId');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('basePrice');
  expect(product).toHaveProperty('category');

  // Verify filtering logic
  for (const p of body) {
    expect(p.category).toBe('Shoes');
  }
});
test('search products by size = M', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/products/search?size=M');

  // Status code check
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Basic assertions
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  // Check fields exist
  const product = body[0];

  expect(product).toHaveProperty('productId');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('basePrice');
  expect(product).toHaveProperty('variants');

  // Verify filtering logic
  for (const p of body) {
  expect(p.variants.some((v: any) => v.size === 'M')).toBe(true);
  }
});
test('search products by name = Under', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/products/search?name=Under');

  // Status code check
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Basic assertions
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  // Check fields exist
  const product = body[0];

  expect(product).toHaveProperty('productId');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('basePrice');
  expect(product).toHaveProperty('variants');

  // Verify filtering logic
  for (const p of body) {
    expect(p.name).toContain("Under");
  }
});
test('search products by tags = running', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/products/search?tags=running');

  // Status code check
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Basic assertions
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  // Check fields exist
  const product = body[0];

  expect(product).toHaveProperty('productId');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('basePrice');
  expect(product).toHaveProperty('tags');

  // Verify filtering logic
  for (const p of body) {
    expect(p.tags).toContain("running");
  }
});
test('Advanced search (cat=shoes, name=Under, size=42, gender=men', async ({ request }) => {
  const response = await request.get('http://localhost:8080/api/v1/products/search?name=Under&category=shoes&size=42&gender=men');

  // Status code check
  expect(response.status()).toBe(200);

  const body = await response.json();

  // Basic assertions
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);

  // Check fields exist
  const product = body[0];

  expect(product).toHaveProperty('productId');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('basePrice');
  expect(product).toHaveProperty('variants');

  // Verify filtering logic
  for (const p of body) {
    expect(p.name).toContain("Under");
    expect(p.category).toBe('Shoes');
    expect(p.gender.toLowerCase()).toBe('men');

    // at least one variant has size 42
    expect(p.variants.some((v: any) => v.size === '42')).toBe(true);
  }
});