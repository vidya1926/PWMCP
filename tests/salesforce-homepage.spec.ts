import { test, expect } from '@playwright/test';

// This test uses the saved session from data/login.json to start from the HomePage

test.use({ storageState: 'data/login.json' });

test('Salesforce HomePage - Validate after login and locate App Launcher', async ({ page }) => {

  // Go to Salesforce HomePage using session storage
  await page.goto('https://testleaf-da-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home');
  // Validate that user is on HomePage (improve selector as needed)
  await expect(page).toHaveURL(/home|lightning/i);


  // Debug: Capture screenshot and page HTML after navigation
  await page.screenshot({ path: 'data/homepage_debug.png', fullPage: true });
  const html = await page.content();
  require('fs').writeFileSync('data/homepage_debug.html', html);

  // Locate the App Launcher element (waffle icon) using text-based XPath
  const appLauncher = page.locator('//button[@title="App Launcher"]/div');
  await expect(appLauncher).toBeVisible();
  // Click the App Launcher
  await appLauncher.click();

  // Click the 'View All' button inside the App Launcher
  const viewAllButton = page.locator('//button[text()="View All"]');
  await expect(viewAllButton).toBeVisible();
  await viewAllButton.click();
});
