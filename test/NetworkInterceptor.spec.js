const { test, expect, request } = require('@playwright/test');
const { text } = require('stream/consumers');
const createOrderPayload = { orders: [{ country: "India", productOrderedId: "67a8df56c0d3e6622a297ccd" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };

let token;
let orderIdValue;

test.beforeAll(async () => {
    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: { userEmail: "aa5@aa5.com", userPassword: "Tester@123" }
        }
    )

    // console.log(loginResponse);
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: createOrderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderIdValue = orderResponseJson.orders[0];
});

test.beforeEach(async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

});


test.only('Registeration', async ({ page }) => {
    //chrome
    //   const context = await browser.newContext();
    //   const page = await context.newPage();

    const orderButton = page.locator("[routerlink*='myorders']");
    //const productsInCart = page.locator('.card-body');
    const rows = page.locator("tbody");
    const rowsCount = page.locator("tbody tr");

    await page.goto("https://rahulshettyacademy.com/client");

    

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,

                });
            //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });

    await orderButton.first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());

});