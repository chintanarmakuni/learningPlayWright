const {test, expect} = require('@playwright/test');

test('Playwright Special Locators', async ({page})=>{



await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");   
await page.getByPlaceholder("Password").fill("Tester@123");
await page.getByRole("button", {name: "Submit"}).click();
const message = await page.getByText(" The Form has been submitted successfully!. ").isVisible();
expect(message).toBeTruthy();

await page.getByRole("link", {name: "Shop"}).click();
await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();

})