const {chromium} = require('playwright');


describe(`Functional tests`,() => {
  let browser = null;
  let page = null;
  let context = null; 
  let count =null;
  let locator = null;

  beforeAll(async () => {
   browser = await chromium.launch();
   context = await browser.newContext();
   page = await context.newPage();
   await page.goto('https://todomvc.com/examples/vanillajs/');
  
  });
  
  afterAll(async() =>{
    await browser.close();  
});

test(`Should load page`, async() => {
  //Assertion on loading page
  expect(page).not.toBeNull();
  expect(page.title()).not.toBeNull();  
});

 // Input ten tasks
 test('Input data into page', async() =>{
  for( i=0; i<10; i++){
    locator = page.locator('input.new-todo');
    await locator.fill('Test' +i);
    await locator.press('Enter');    
   }
   count = await page.getByRole('strong').allTextContents();   
//assertion
   expect(count).toEqual(['10']);
});

test('Test removing item from All section of list', async() =>{
  await page.getByRole('listitem').filter({ hasText: 'Test 1' }).getByRole('button', { name: '×' }).click();
   count = await page.getByRole('strong').allTextContents()
      //assertion
   expect(count).toEqual(['9']);
 });  
 
 test('Go to Active Page, and remove item', async() =>{
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Test 2' }).getByRole('button', { name: '×' }).click();
   count = await page.getByRole('strong').allTextContents()
      //assertion
   expect(count).toEqual(['8']);
 });
 test('Go to Completed Page, and remove item', async() =>{
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Test 3' }).getByRole('checkbox').check();
  await page.getByRole('link', { name: 'Completed' }).click();
   count = await page.getByRole('strong').allTextContents()
   const newLabel = await page
   .getByText('Test 3')
   .allInnerTexts();
      //assertion
    expect(count).toEqual(['7']);
    expect(newLabel).not.toBeNull();
    expect(newLabel).toEqual(['Test 3']);
    
 });
 test('on the Completed tab, the Clear completed button is visible', async() =>{
  await page.getByRole('link', { name: 'Completed' }).click();     
      //assertion
      expect (page.getByRole('button', {name : 'clear-completed'})).isVisible;
 });
});
