import { test, expect } from '@playwright/test';
// Browsers downloaded at
//AppData\Local\ms-playwright\chromium-1208
test('test', async ({ page }) => {
  await page.goto('chrome-error://chromewebdata/');
  await expect(page.locator('#main-content')).toBeVisible();
});