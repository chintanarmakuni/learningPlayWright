const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');
const { LoginPage } = require('../node_modules/pageObjects/loginPage.js');
const { DashboardPage } = require('../node_modules/pageObjects/DashboardPage.js');

test.only('Registeration', async ({page})=>{
    //chrome
 //   const context = await browser.newContext();
 //   const page = await context.newPage();


    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const email = page.locator('#userEmail');
    const phoneNumber = page.locator('#userMobile');
    const password = page.locator('#userPassword');
    const confirmPassword = page.locator('#confirmPassword');
    const ageCheckBox = page.locator("input[type='checkbox']");
    const register = page.locator("input[type='submit']");
    const loginAfterRegister = page.locator('.btn.btn-primary');
    const titleName = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const productName = "ADIDAS ORIGINAL"
    const cartButton = page.locator("[routerlink*='cart']");
    const productInCart = page.locator('h3:has-text("ADIDAS ORIGINAL")');
    const checkoutButton = page.locator("text='Checkout'");
    const creditCardNumber = page.locator("[value='4542 9931 9292 2293']");
    const expiryDate = page.locator('select');
    const cvvCode = page.locator("body > app-root:nth-child(1) > app-order:nth-child(2) > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > input:nth-child(2)");
    const countryDropDown = page.locator("[placeholder*='Country']");
    const dropDownResults = page.locator(".ta-item");
    const placeOrderButton = page.locator(".action__submit");
    const thankYouMessage = page.locator(".hero-primary");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const orderButton = page.locator("[routerlink*='myorders']");
    const productsInCart = page.locator('.card-body');
   const rows = page.locator("tbody");
   const rowsCount = page.locator("tbody tr");

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin("aa5@aa5.com","Tester@123");
   
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

 //  await page.waitForLoadState('networkidle');
const bool = await productInCart.isVisible();
expect(bool).toBeTruthy();

await checkoutButton.click();
await creditCardNumber.fill('4542 9931 9292 2293');
await expiryDate.nth(0).selectOption("05");
await expiryDate.last().selectOption("30");
await cvvCode.fill('123');
await countryDropDown.pressSequentially("ind");

//await dropDownResults.waitFor();
await dropDownResults.first().waitFor({ timeout: 10000 });
const optionsCount = await dropDownResults.count();

for (let i=0; i<optionsCount; ++i){
   if (await dropDownResults.nth(i).textContent() === " India")
   {
      await dropDownResults.nth(i).click();
      break;
   }
}

await placeOrderButton.click();
await thankYouMessage.textContent();
await expect(thankYouMessage).toHaveText(" Thankyou for the order. ");
const orderIdValue = await orderId.textContent();
console.log(orderIdValue);

await orderButton.first().click();
await rows.waitFor();

//const orderIdRecord = await orderIdPage.allTextContents();
const orderCount = await rowsCount.count();


console.log(orderCount);

//await page.pause();
for (let i=0; i<orderCount; ++i){
    const rowOrderId = await rowsCount.nth(i).locator("th").textContent();
    if (orderIdValue.includes(rowOrderId))
      {
         await rowsCount.nth(i).locator("button").first().click();
         break;
}

}

await page.pause();
    });  