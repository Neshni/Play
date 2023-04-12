import { PageObjects } from '../common/pageObjects';
import { Constants } from '../common/constants';
const { test, expect, chromium } = require('@playwright/test');

test.describe('these are test cases for the count value on the page', () => {
  let browser = null;
  let context = null;
  let count = null;
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
    expect(page).not.toBeNull();
    expect(await page.title()).not.toBeNull();
  });

  test('Validate count starts as Zero', async () => {
    count = await page.getByRole('strong').allTextContents();
    await expect(count).toEqual([]);
  });

  test('Input first set of data and validate count', async () => {
    await pageObjects.addToDo('prepare for test', 'Enter');
    count = await page.getByRole('strong').allTextContents();
    await expect(count).not.toBeNull();
    await expect(count).toEqual(['1']);
  });

  test('Input second set of data', async () => {
    await pageObjects.addToDo('prepare for physics tests', 'Enter');
    count = await page.getByRole('strong').allTextContents();
    await expect(count).not.toBeNull();
    await expect(count).toEqual(['2']);
  });

  test('Validate count once a task is completed', async () => {
    await page.getByRole('listitem').filter({ hasText: 'prepare for test' }).getByRole('checkbox').check();
    count = await page.getByRole('strong').allTextContents();
    await expect(count).toEqual(['1']);
    await expect(count).not.toBeNull();
  });

  test.skip('Validate count once a task is delete', async () => {
    await page.getByRole('listitem').filter({ hasText: 'prepare for physics tests' }).getByRole('button', { name: '×' }).click();
    count = await page.getByRole('strong').allTextContents();
    await expect(count).toEqual([]);
  });
});
