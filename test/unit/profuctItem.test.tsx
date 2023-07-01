import React from "react";
import "@testing-library/jest-dom";

import { ProductItem } from "../../src/client/components/ProductItem";
import { ProductShortInfo } from "../../src/common/types";

import { renderApp } from "./utils/allProviders";

describe("Проверка компонента ProductItem", () => {
    it("В карточке товара должно отображаться название товара", () => {
        const product: ProductShortInfo = {
            id: 1,
            name: "product",
            price: 99,
        };

        const { getByRole } = renderApp({ children: <ProductItem product={product} /> });

        const header = getByRole("heading").textContent;

        expect(header).toEqual(product.name);
    });

    it("В карточке товара должна отображаться цена товара", () => {
        const product: ProductShortInfo = {
            id: 1,
            name: "product",
            price: 99,
        };

        const { getByText } = renderApp({ children: <ProductItem product={product} /> });

        const price = getByText(`$${product.price}`).textContent;

        expect(price).not.toBeNull();
    });

    it("В карточке товара должна отображаться ссылка на страницу с подробной информацией", () => {
        const product: ProductShortInfo = {
            id: 1,
            name: "product",
            price: 99,
        };

        const { getByRole } = renderApp({ children: <ProductItem product={product} /> });

        const link = getByRole("link");

        expect(link).toHaveAttribute("href", `/catalog/${product.id}`);
    });
});
