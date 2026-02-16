import { test, expect } from '@playwright/test';

test('Login test', async ({ request }) => {

  const response = await request.post('http://localhost:8080/api/v1/auth/login', {
    data: {
      username: 'alex',
      password: 'Strong123!'
    }
  });

  // status
  expect(response.status()).toBe(200);

  const body = await response.json();

  // token exists
  expect(body.token).toBeTruthy();

  // token format (JWT = 3 dot-separated parts)
  const tokenParts = body.token.split('.');
  expect(tokenParts.length).toBe(3);

});