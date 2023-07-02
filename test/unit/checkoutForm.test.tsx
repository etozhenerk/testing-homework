import React from "react";
import "@testing-library/jest-dom";
import { renderApp } from "./utils/allProviders";
import { waitFor } from "@testing-library/react";
import { mockCartApi } from "./mocks/api";
import { Cart } from "../../src/client/pages/Cart";
import { server } from "./mocks/server";

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

describe("Проверка работы корзины", () => {
    it("После отправки формы с валидными данными должно появиться сообщение Well done!", async () => {
        const name = "test";
        const phone = "89777777777";
        const address = "test";
        const cartApi = new mockCartApi();
        cartApi.setState({
            0: {
                count: 1,
                name: "product",
                price: 99,
            },
        });

        const { getByRole, getByTestId, user } = renderApp({
            children: <Cart />,
            cartApi,
        });

        const nameInput = getByTestId("nameInput");
        const phoneInput = getByTestId("phoneInput");
        const addressTextbox = getByTestId("addressInput");
        const checkout = getByRole("button", { name: /checkout/i });

        await user.type(nameInput, name);
        await user.type(phoneInput, phone);
        await user.type(addressTextbox, address);
        await user.click(checkout);

        await waitFor(() => expect(phoneInput).not.toHaveClass("is-invalid"));

        const text = getByTestId("successMessage").textContent?.includes("Well done!");

        expect(text).toBeTruthy();
    });

    it("После отправки формы с валидными данными, на полях для ввода не должно быть алертов", async () => {
        const name = "test";
        const phone = "89777777777";
        const address = "test";

        const cartApi = new mockCartApi();
        cartApi.setState({
            0: {
                count: 1,
                name: "product",
                price: 99,
            },
        });

        const { getByRole, getByTestId, user } = renderApp({
            children: <Cart />,
            cartApi,
        });

        const nameInput = getByTestId("nameInput");
        const phoneInput = getByTestId("phoneInput");
        const addressTextbox = getByTestId("addressInput");
        const checkout = getByRole("button", { name: /checkout/i });

        await user.type(nameInput, name);
        await user.type(phoneInput, phone);
        await user.type(addressTextbox, address);
        await user.click(checkout);

        expect(nameInput).not.toHaveClass("is-invalid");
        expect(phoneInput).not.toHaveClass("is-invalid");
        expect(addressTextbox).not.toHaveClass("is-invalid");
    });
});
