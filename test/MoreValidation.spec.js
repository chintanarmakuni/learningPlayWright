const {test, expect} = require('@playwright/test');

test ("MoreValidation", async({page})=>{


    const showHideField = page.locator("#displayed-text");
    const hideButton = page.locator("#hide-textbox");
    const showButton = page.locator("#show-textbox");
    const confirmButton = page.locator("[value='Confirm']");
    const mouseHover = page.locator("#mousehover");

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   // await page.goto("http://google.com");
    //await page.goBack ();

    await page.waitForLoadState('networkidle');
    //await expect((showHideField).tobeVisible());
    await expect(page.locator("#displayed-text")).toBeVisible();
    await hideButton.click();
    await expect(showHideField).toBeHidden();
    await page.on('dialog', dialog=>{dialog.accept()});
    await confirmButton.click();

    await mouseHover.hover();

   const framesPage = page.frameLocator("#courses-iframe");

   await framesPage.locator("li a[href*='access']:visible").click();
   const message = await framesPage.locator(".text h2").textContent();
   console.log(message.split(" ")[1]);


})

test.only ("Visual", async({page})=>{


    await page.goto("https://www.flightaware.com/live/flight/UAE219");

     expect(await page.screenshot()).toMatchSnapshot('flightaware.png');


})