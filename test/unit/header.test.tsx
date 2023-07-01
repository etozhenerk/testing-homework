import React from "react";
import "@testing-library/jest-dom";
import { Application } from "../../src/client/Application";

import { renderApp } from "./utils/allProviders";
import { waitFor } from "@testing-library/react";
import { fireResize } from "./utils/resize";

describe("Проверка меню в шапке приложения", () => {
    it("В шапке должны отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
        const links = ["Example store", "Catalog", "Delivery", "Contacts", "Cart"];

        const { getAllByRole } = renderApp({ children: <Application /> });
        const renderedLinks = getAllByRole("link").map((item) => item.textContent);

        expect(renderedLinks).toStrictEqual(links);
    });

    it("Название магазина в шапке должно быть ссылкой на главную страницу", () => {
        const { getByText } = renderApp({ children: <Application /> });
        const storeName = getByText("Example store");

        expect(storeName).toHaveAttribute("href", "/");
    });

    it("При клике на элемент меню, всё меню должно скрываться", async () => {
        const { getByRole, getByTestId, user } = renderApp({ children: <Application /> });

        await waitFor(() => fireResize(500));

        const menuButton = getByRole("button", { name: /toggle navigation/i });
        const menu = getByTestId("menu");

        await user.click(menuButton);

        const link = getByRole("link", { name: /delivery/i });

        await user.click(link);

        expect(menu).toHaveClass("collapse");
    });
});
