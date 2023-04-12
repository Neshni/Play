import { PageObjects } from '../common/pageObjects';
import { Constants } from '../common/constants';
const { test, expect, chromium } = require('@playwright/test');

test.describe('Functional tests', () => {
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
    expect(page.title()).not.toBeNull();
  });

  test('Input data into page', async () => {
    for (let i = 0; i < 10; i++) {
      await pageObjects.addToDo(`Test${i}`, 'Enter');
    }
    count = await page.getByRole('strong').allTextContents();
    expect(count).toEqual(['10']);
  });

  test.skip('Test removing item from All section of list', async () => {
    test.setTimeout(5000);
    await page.getByRole('listitem').filter({ hasText: 'Test 1' }).getByRole('button', { name: '×' }).click();
    count = await page.getByRole('strong').allTextContents();
    expect(count).toEqual(['9']);
  });

  test.skip('Go to Active Page, and remove item', async () => {
    test.setTimeout(5000);
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Test 2' }).getByRole('button', { name: '×' }).click();
    count = await page.getByRole('strong').allTextContents();
    expect(count).toEqual(['8']);
  });

  test.skip('Go to Completed Page, and remove item', async () => {
    test.setTimeout(5000);
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Test 3' }).getByRole('checkbox').check();
    count = await page.getByRole('strong').allTextContents();
    const newLabel = await page
      .getByText('Test 3')
      .allInnerTexts();
    expect(count).toEqual(['7']);
    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual(['Test 3']);
  });

  test('on the Completed tab, the Clear completed button is visible', async () => {
    test.setTimeout(5000);
    await page.getByRole('link', { name: 'Completed' }).click();
    expect(page.getByRole('button', { name: 'clear-completed' })).isVisible().toEqual(true);
  });
});
