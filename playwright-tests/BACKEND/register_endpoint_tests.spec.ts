import { test, expect } from '@playwright/test';

test('Login test', async ({ request }) => {

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