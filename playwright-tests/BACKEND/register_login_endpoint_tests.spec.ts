import { test, expect } from '@playwright/test';

test('Register test', async ({ request }) => {

  const response = await request.post('http://localhost:8080/api/v1/auth/login', {
	data: {
		username: "alex",
		email: "alex@test.com",
		password: "Strong123!",

		firstName: "Alex",
		lastName: "Brown",
		address: "Main Street 12",
		city: "Athens",
		postalCode: "11527",
		phoneNumber: "6900000000"
	}
  });
  // status
  expect(response.status()).toBe(200);
  const body = await response.json();
  //username is correct
  expect(body.username).toBe("alex");

});
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