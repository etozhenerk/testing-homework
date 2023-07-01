import React from "react";
import "@testing-library/jest-dom";

import { Catalog } from "../../src/client/pages/Catalog";
import { renderApp } from "./utils/allProviders";
import { ExampleApi } from "../../src/client/api";
import { screen } from "@testing-library/react";
import { Application } from "../../src/client/Application";

describe("Проверка страницы Catalog", () => {
    it("У всех продуктов должно отображаться название", async () => {
        // const api = new ExampleApi("/");
        // const { getAllByRole, getByText, findAllByRole, user } = renderApp({ children: <Application />, mockApi: api });
        // const lint = getByText("Catalog");
        // const a = await api.getProducts();
        // console.log(a);

        // await user.click(lint);
        // await screen.findAllByRole("link", { name: /details/i }, { timeout: 2000 });
        // screen.logTestingPlaygroundURL();
    });
});
