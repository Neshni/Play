import { PageObjects } from '../common/pageObjects';
import { Constants } from '../common/constants';
const { test, expect, chromium } = require('@playwright/test');

test.describe('input fields', () => {
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
    expect(page).not.toBeNull();
    expect(await page.title()).not.toBeNull();
  });

  test('Validate first set of data', async () => {
    const text = 'prepare for Math test';
    await pageObjects.addToDo(text, 'Enter');

    const newLabel = await page
      .getByText(text)
      .allInnerTexts();

    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual([text]);
  });

  test('Validate alphanumeric data', async () => {
    const text = ('This !s#$#d423t4f f4 WCERwd+)()#D#');
    await pageObjects.addToDo(text, 'Enter');
    const newLabel = await page
      .getByText(text)
      .allInnerTexts();

    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual([text]);
  });

  test('Validate data isis only number', async () => {
    const text = ('1231021301321023102');
    await pageObjects.addToDo(text, 'Enter');

    const newLabel = await page
      .getByText(text)
      .allInnerTexts();

    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual([text]);
  });

  test('Validate data is really long', async () => {
    const text = ("'Now it’s time to write the test to check the book image.Let's do some assignment for our new variable, which is going to be await page. And again, we're going to look for multiple ones, so we have to use that double dollar symbol. And I forgot I have these element handles with all of those cells in it. So, what we can do is create another one for the image URL, because I want to check that this URL here is not null, which means it exists. So, it's still imgUrl = await firstRowCells. This is the position zero. And we're going to get the “img”. And now, what we can do is use expect(await imgUrl.getAttribute()). We will get the attribute “src”, which should be not.toBeNull.");
    await pageObjects.addToDo(text, 'Enter');

    const newLabel = await page
      .getByText(text)
      .allInnerTexts();

    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual([text]);
  });

  test(' Ensure Japanese character is validated', async () => {
    const text = ("'としのり");
    await pageObjects.addToDo(text, 'Enter');

    const newLabel = await page
      .getByText(text)
      .allInnerTexts();

    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual([text]);
  });

  test('Ensure Greek character is validated', async () => {
    const text = ('Τοσινόρι');
    await pageObjects.addToDo(text, 'Enter');

    const newLabel = await page
      .getByText(text)
      .allInnerTexts();

    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual([text]);
  });
});
