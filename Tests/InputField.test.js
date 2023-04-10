const {chromium} = require('playwright');

describe('input fields',() => {
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

  test('Should load page', async() => {
    //Assertion on loading page
    expect(page).not.toBeNull();
    expect(await page.title()).not.toBeNull();  
  });

/// validate data enter is stored in list
   test(`Validate first set of data`, async() =>{
    const locator = page.locator('input.new-todo');
     await locator.fill('prepare for Math test');
     await locator.press('Enter');

     //find text
     const newLabel = await page
       .getByText('prepare for Math test')
       .allInnerTexts();
    
       //assertion
       expect(newLabel).tobetruthy;
       expect(newLabel).not.toBeNull();
       expect(newLabel).toEqual(['prepare for Math test']);
   });

   /// validate data with alphanumeric values entered is stored in list
   test(`Validate alphanumeric data`, async() =>{
    const locator = page.locator('input.new-todo');
    const text = ('This !s#$#d423t4f f4 WCERwd+)()#D#');
     await locator.fill(text);
     await locator.press('Enter');

     //find text
     const newLabel = await page
       .getByText(text)
       .allInnerTexts();
    
       //assertion
       expect(newLabel).tobetruthy;
       expect(newLabel).not.toBeNull();
       expect(newLabel).toEqual([text]);
   });

   /// Validate data is only numbers
   test(`Validate data isis only number`, async() =>{
    const locator = page.locator('input.new-todo');
    const text = ('1231021301321023102');
     await locator.fill(text);
     await locator.press('Enter');

     //find text
     const newLabel = await page
       .getByText(text)
       .allInnerTexts();
    
       //assertion
       expect(newLabel).tobetruthy;
       expect(newLabel).not.toBeNull();
       expect(newLabel).toEqual([text]);
   });

   /// Validate data really long
   test(`Validate data is really long`, async() =>{
    const locator = page.locator('input.new-todo');
    const text = ("'Now it’s time to write the test to check the book image.Let's do some assignment for our new variable, which is going to be await page. And again, we're going to look for multiple ones, so we have to use that double dollar symbol. And I forgot I have these element handles with all of those cells in it. So, what we can do is create another one for the image URL, because I want to check that this URL here is not null, which means it exists. So, it's still imgUrl = await firstRowCells. This is the position zero. And we're going to get the “img”. And now, what we can do is use expect(await imgUrl.getAttribute()). We will get the attribute “src”, which should be not.toBeNull.");  
     await locator.fill(text);
     await locator.press('Enter');

     //find text
     const newLabel = await page
       .getByText(text)
       .allInnerTexts();
    
       //assertion
       expect(newLabel).tobetruthy;
       expect(newLabel).not.toBeNull();
       expect(newLabel).toEqual([text]);
   });

     /// Ensure Japanese character is validated
     test(` Ensure Japanese character is validated`, async() =>{
      const locator = page.locator('input.new-todo');
      const text = ("'としのり");  
       await locator.fill(text);
       await locator.press('Enter');
  
       //find text
       const newLabel = await page
         .getByText(text)
         .allInnerTexts();
      
         //assertion
         expect(newLabel).tobetruthy;
         expect(newLabel).not.toBeNull();
         expect(newLabel).toEqual([text]);
     });

          /// Ensure Greek character is validated
          test(`Ensure Greek character is validated`, async() =>{
            const locator = page.locator('input.new-todo');
            const text = ('Τοσινόρι');  
             await locator.fill(text);
             await locator.press('Enter');
        
             //find text
             const newLabel = await page
               .getByText(text)
               .allInnerTexts();
            
               //assertion
               expect(newLabel).tobetruthy;
               expect(newLabel).not.toBeNull();
               expect(newLabel).toEqual([text]);
           });
});
