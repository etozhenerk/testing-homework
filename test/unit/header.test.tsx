import React from "react";
import "@testing-library/jest-dom";
import { Application } from "../../src/client/Application";
import { render } from "@testing-library/react";
import events from "@testing-library/user-event";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { BrowserRouter } from "react-router-dom";

describe("Проверка меню в шапке приложения", () => {
  it("В шапке должны отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
    const links = ["Example store", "Catalog", "Delivery", "Contacts", "Cart"];
    const basename = "/";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    const { getAllByRole } = render(app);
    const renderedLinks = getAllByRole("link").map((item) => item.textContent);

    expect(renderedLinks).toStrictEqual(links);
  });

  it("Название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const basename = "/";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    const { getByText } = render(app);
    const storeName = getByText("Example store");

    expect(storeName).toHaveAttribute("href", "/");
  });
});
