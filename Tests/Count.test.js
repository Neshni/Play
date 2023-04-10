const {chromium} = require('playwright');

describe(`these are test cases for the count value on the page`,() => {
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
    await browser.close()
    ;
  });

  test(`Should load page`, async() => {
    //Assertion on loading page
    expect(page).not.toBeNull();
    expect(await page.title()).not.toBeNull();  
  });

   //Validate count starts as Zero
   test('Validate count starts as Zero', async() =>{
    count = await page.getByRole('strong').allTextContents();
  //assertion
        await expect(count).toEqual([]);
 });

  // Input 1st task
   test('Input first set of data and validate count', async() =>{
      locator = page.locator('input.new-todo');
      await locator.fill('prepare for test');
      await locator.press('Enter');
      count = await page.getByRole('strong').allTextContents();
    //assertion
      await expect(count).not.toBeNull();
      await expect(count).toEqual(['1']);  
   });
  // input 2nd Tasks
   test(`Input second set of data`, async() =>{
  locator = page.locator('input.new-todo');
   await locator.fill('prepare for physics tests');
   await locator.press('Enter');
     count = await page.getByRole('strong').allTextContents();
    //assertion
      await expect(count).not.toBeNull();
      await expect(count).toEqual(['2']);
   });
  // Validate count once a task is completed
   test(`Validate count once a task is completed`, async() =>{
    await page.getByRole('listitem').filter({ hasText: 'prepare for test' }).getByRole('checkbox').check();
    count = await page.getByRole('strong').allTextContents();
               //assertion
        await expect(count).toEqual(['1']);
        await expect(count).not.toBeNull();
      });   
        // Validate count once a task is deleted
   /* test(`Validate count once a task is delete`, async() =>{
      await page.getByRole('listitem').filter({ hasText: 'prepare for physics tests' }).getByRole('button', { name: '×' }).click();
       count = await page.getByRole('strong').allTextContents()
          //assertion
       await expect(count).toEqual([]);
     });   */
});
