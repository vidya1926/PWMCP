import { test, expect } from '@playwright/test';
import fs from 'fs';

// Salesforce login test based on login.feature steps

test('Salesforce Login - HomePage Navigation and store session', async ({ page, context }) => {
  // Step 1: Open the Salesforce login application
  await page.goto('http://login.salesforce.com');

  // Step 2: Login to the application
  await page.fill('input#username', 'vidyar@testleaf.com');
  await page.fill('input#password', 'Sales@123');
  await page.click('input#Login');

  // Step 3: Verify the page is navigated to HomePage
  await expect(page).toHaveURL(/home|lightning/i);

  // Save storage state (session data) to data/login.json
  await context.storageState({ path: 'data/login.json' });
});
