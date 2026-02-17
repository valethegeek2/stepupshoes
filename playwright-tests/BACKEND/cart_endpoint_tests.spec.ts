import { test, expect } from '@playwright/test';
import { loginAndGetToken } from './auth.helper';

test('Cart Endpoint: add -> view -> remove', async ({ request }) => {

  const token = await loginAndGetToken(request);

  // ADD ITEM TO CART
  const addResponse = await request.post(
    'http://localhost:8080/api/v1/cart',
    {
		headers: {
			Authorization: `Bearer ${token}`
		},
    	data: {
			variantId: 1,
			quantity: 2
    }
    }
  );

  expect(addResponse.ok()).toBeTruthy();

  // VIEW CART
  const viewResponse = await request.get(
    'http://localhost:8080/api/v1/cart',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(viewResponse.ok()).toBeTruthy();

  const cart = await viewResponse.json();

  expect(cart.length).toBeGreaterThan(0);

  const item = cart.find((i: any) => i.variantId === 1);

  expect(item).toBeTruthy();
  expect(item.quantity).toBe(2);

  // REMOVE ITEM
  const removeResponse = await request.delete(
    'http://localhost:8080/api/v1/cart/1',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(removeResponse.ok()).toBeTruthy();
});