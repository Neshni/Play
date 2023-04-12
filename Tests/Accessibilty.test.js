import { PageObjects } from '../common/pageObjects';
import { Constants } from '../common/constants';
const { test, expect, chromium } = require('@playwright/test');

test.describe('accessibility', () => {
  let browser = null;
  let context = null;
  let page = null;
  let pageObjects = null;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    pageObjects = new PageObjects(page);
    await pageObjects.goToUrl(Constants.stringConstants.url);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('Should load page', async () => {
    await expect(page).not.toBeNull();
    const title = page.getByLabel('VanillaJS • TodoMVC');
    await expect(title).not.toBeNull();
  });
});
