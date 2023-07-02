const { assert } = require("chai");

const { BUG_ID } = process.env;

describe("Проверка верстки приложения", async () => {
    it("Кнопка Add to Cart должна быть нужного размера", async ({ browser }) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto(`http://localhost:3000/hw/store/catalog/0?bug_id=${BUG_ID}`);
        await page.waitForSelector(".ProductDetails-AddToCart", { timeout: 5000 });

        await browser.assertView("plain", ".ProductDetails-AddToCart");
    });

    it("После отправки формы должно появиться сообщение об успешном заказе зеленого цвета", async ({ browser }) => {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto("http://localhost:3000/hw/store/catalog/0");

        await page.waitForSelector(".Product", { timeout: 5000 });

        await page.click(".ProductDetails-AddToCart");

        await page.goto(`http://localhost:3000/hw/store/cart?bug_id=${BUG_ID}`);

        await page.waitForSelector(".Cart", { timeout: 5000 });

        await page.type(".Form-Field_type_name", "test");
        await page.type(".Form-Field_type_phone", "89777777777");
        await page.type(".Form-Field_type_address", "test");

        await page.click(".Form-Submit");

        await page.waitForSelector(".Cart-SuccessMessage", { timeout: 5000 });

        await browser.assertView("plain", "body", {
            ignoreElements: [".Cart-SuccessMessage p"],
        });
    });
});
