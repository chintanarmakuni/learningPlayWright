const {test, expect, request} = require('@playwright/test');
const { text } = require('stream/consumers');
const createOrderPayload = {orders:[{country:"India",productOrderedId:"67a8df56c0d3e6622a297ccd"}]}

let token;
let orderIdValue;

test.beforeAll( async()=>{
                const apiContext = await request.newContext();

             const loginResponse =   await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                    {
                        data : {userEmail: "aa5@aa5.com", userPassword: "Tester@123"}
                    }
)   

           // console.log(loginResponse);
            expect(loginResponse.ok()).toBeTruthy();
            const loginResponseJson = await loginResponse.json();
            token = loginResponseJson.token;
            console.log(token);

            const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
               data:createOrderPayload,
               headers:{
                  'Authorization':token,
                  'Content-Type':'application/json'
               }
            })

            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            orderIdValue = orderResponseJson.orders[0];
});

test.beforeEach( async({page})=> {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

});


test.only('Registeration', async ({page})=>{
    //chrome
 //   const context = await browser.newContext();
 //   const page = await context.newPage();

 const orderButton = page.locator("[routerlink*='myorders']");
 //const productsInCart = page.locator('.card-body');
 const rows = page.locator("tbody");
 const rowsCount = page.locator("tbody tr");

    await page.goto("https://rahulshettyacademy.com/client");

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
         await page.pause();
         break;
}


}
    });