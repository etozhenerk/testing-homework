import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { ProductItem } from "../../src/client/components/ProductItem";
import { ProductShortInfo } from "../../src/common/types";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

describe("Проверка компонента ProductItem", () => {
  it("В карточке товара должно отображаться название товара", () => {
    const product: ProductShortInfo = {
      id: 1,
      name: "product",
      price: 99,
    };
    const basename = "/";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <ProductItem product={product} />
        </Provider>
      </BrowserRouter>
    );

    const { getByRole } = render(app);

    const header = getByRole("heading").textContent;

    expect(header).toEqual(product.name);
  });

  it("В карточке товара должна отображаться цена товара", () => {
    const product: ProductShortInfo = {
      id: 1,
      name: "product",
      price: 99,
    };

    const basename = "/";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <ProductItem product={product} />
        </Provider>
      </BrowserRouter>
    );

    const { getByText } = render(app);

    const price = getByText(`$${product.price}`).textContent;

    expect(price).not.toBeNull();
  });

  it("В карточке товара должна отображаться ссылка на страницу с подробной информацией", () => {
    const product: ProductShortInfo = {
      id: 1,
      name: "product",
      price: 99,
    };

    const basename = "/";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <ProductItem product={product} />
        </Provider>
      </BrowserRouter>
    );

    const { getByRole } = render(app);

    const link = getByRole("link");

    expect(link).toHaveAttribute("href", `/catalog/${product.id}`);
  });
});
