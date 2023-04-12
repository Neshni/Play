import { PageObjects } from '../common/pageObjects';
import { Constants } from '../common/constants';
const { test, expect, chromium } = require('@playwright/test');

test.describe('page', () => {
  let browser = null;
  let page = null;
  let pageObjects = null;
  let context = null;
  let count = null;

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
    expect(page).not.toBeNull();
  });

  test('Input 200 tasks into page', async () => {
    for (let i = 0; i < 100; i++) {
      await pageObjects.addToDo(`Test${i}`, 'Enter');
    }
    count = await page.getByRole('strong').allTextContents();
    expect(count).toEqual(['100']);
  });

  test('Test Source link on page', async () => {
    const sourcelink = page.url('a:has-text("vanillajs")');
    expect(sourcelink).not.toBeNull();
  });
});
