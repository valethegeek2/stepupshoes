import { APIRequestContext, expect } from '@playwright/test';

export async function loginAndGetToken(request: APIRequestContext) {
  const response = await request.post('http://localhost:8080/api/v1/auth/login', {
    data: {
      username: 'customer1',
      password: 'password'
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.accessToken).toBeTruthy();

  return body.accessToken;
}
