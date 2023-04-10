const {chromium} = require('playwright');

describe(`page`,() => {
  let browser = null;
  let page = null;
  let context = null; 

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
  });

  test('Input 200 tasks into page', async() =>{
    for( i=0; i<100; i++){
      locator = page.locator('input.new-todo');
      await locator.fill('Test' +i);
      await locator.press('Enter');    
     }
     count = await page.getByRole('strong').allTextContents();   
  //assertion
     expect(count).toEqual(['100']);
  });

  test('Test Source link on page', async() => {
  const sourcelink = page.url('a:has-text("vanillajs")');
  console.log(sourcelink);
  expect(sourcelink).not.toBeNull();
  });
});
