const {chromium} = require('playwright');


describe(`accessibility`,() => {
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
    await browser.close()    ;
  });

  test(`Should load page'`, async() => {
    //Assertion on loading page
   await expect(page).not.toBeNull();
   const url = page.getByLabel('VanillaJS • TodoMVC');
    await expect(url).not.toBeNull() ;
  });  
});
 