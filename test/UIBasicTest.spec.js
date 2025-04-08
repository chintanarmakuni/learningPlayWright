const {test, expect} = require('@playwright/test');
const { sign } = require('crypto');

test('First PlayWright Test With Browser context', async ({browser})=>{
//chrome
const context = await browser.newContext();
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

});

test('Second Test with only Page', async ({page})=>{
    //chrome
 //   const context = await browser.newContext();
 //   const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = await page.locator('#username');
    const password = await page.locator('#password');
      const signIn = await page.locator('#signInBtn');

    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill('rahulshetty');
    await password.fill('learning');
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());

    });

    test('UI Control', async ({page})=>{

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
      const userName =  page.locator('#username');
      const password =  page.locator('#password');
      const signIn =  page.locator('#signInBtn');
      const dropDown =  page.locator('select.form-control');
      const radioButtonUser =  page.locator('span.radiotextsty').nth(1);
      const okBUtton = page.locator('#okayBtn');
      const terms = page.locator('#terms');
      const documentLink = page.locator("[href*='documents-request']");

      await userName.fill('rahulshettyacademy');
      await password.fill('learning');
      await dropDown.selectOption("Consultant");
      await radioButtonUser.click();
      await okBUtton.click();
      await expect(radioButtonUser).toBeChecked();
      await terms.click();
      await expect(terms).toBeChecked();
      await expect(documentLink).toHaveAttribute('class','blinkingText');
      
      //await page.pause();
  
      });

      test.only('Switching window', async ({browser})=>{

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
        const userName =  page.locator('#username');
        const password =  page.locator('#password');
        const signIn =  page.locator('#signInBtn');
        const dropDown =  page.locator('select.form-control');
        const radioButtonUser =  page.locator('span.radiotextsty').nth(1);
        const okBUtton = page.locator('#okayBtn');
        const terms = page.locator('#terms');
        const documentLink = page.locator("[href*='documents-request']");
        
        

        const [page2] = await Promise.all(
          [context.waitForEvent('page'),
          documentLink.click(),
          ]);

        const mentorLink = page2.locator('.im-para.red');
        

        const text = await mentorLink.textContent();

        console.log(text);

        const domain = text.split("@");
        const email = domain[1].split(" ")[0];
        console.log(email);

        await page.bringToFront();
        await page.locator('#username').fill(email);
        
        await page.pause();
    
        });