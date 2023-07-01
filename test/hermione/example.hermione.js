const { assert } = require("chai");

describe("microsoft", async () => {
    it("Тест, который пройдет", async ({ browser }) => {
        await this.browser.url("http://localhost:3000/hw/store/catalog");
        await this.browser.assertView("plain", "body");

        const title = await this.browser.$("#uhfLogo").getText();
        assert.equal(title, "Microsoft");
    });
});
