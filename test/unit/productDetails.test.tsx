import React from "react";
import "@testing-library/jest-dom";

import { Product } from "../../src/common/types";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { renderApp } from "./utils/allProviders";
import { Application } from "../../src/client/Application";
import { mockCartApi } from "./mocks/api";
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

describe("Проверка компонента ProductDetails", () => {
    it("В карточке товара должно отображаться название товара", () => {
        const product: Product = {
            id: 1,
            name: "product",
            price: 99,
            description: "description",
            color: "white",
            material: "frozen",
        };

        const { getByRole } = renderApp({ children: <ProductDetails product={product} /> });

        const header = getByRole("heading").textContent;

        expect(header).toEqual(product.name);
    });

    it("Если добавить продукт в корзину, то счетчик продуктов в корзине увеличится", async () => {
        const { getByText, user, findAllByRole, findByRole } = renderApp({
            children: <Application />,
        });

        const link = getByText("Catalog");
        await user.click(link);

        const productLink = await findAllByRole("link", { name: /details/i });

        await user.click(productLink[0]);

        const button = await findByRole("button", { name: /add to cart/i });
        const cartlink = getByText("Cart");

        await user.click(button);

        const buttonText = cartlink.textContent;

        expect(buttonText?.includes("1")).toBeTruthy();
    });

    it("Если добавить продукт в корзину, то продукт добавится в localeStorage", async () => {
        const product: Product = {
            id: 1,
            name: "product",
            price: 99,
            description: "description",
            color: "white",
            material: "frozen",
        };

        const cartApi = new mockCartApi();

        const { getByRole, user } = renderApp({
            children: <ProductDetails product={product} />,
            cartApi,
        });

        const button = getByRole("button", { name: /add to cart/i });

        await user.click(button);

        const state = cartApi.getState();

        expect(state).not.toStrictEqual({});
    });

    it("Кнопка в карточке продукта должна быть большой", async () => {
        const product: Product = {
            id: 1,
            name: "product",
            price: 99,
            description: "description",
            color: "white",
            material: "frozen",
        };

        const cartApi = new mockCartApi();

        const { getByRole } = renderApp({
            children: <ProductDetails product={product} />,
            cartApi,
        });

        const button = getByRole("button", { name: /add to cart/i });

        expect(button).not.toHaveClass("btn-sm");
    });
});
