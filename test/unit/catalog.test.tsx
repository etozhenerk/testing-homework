import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Catalog } from "../../src/client/pages/Catalog";

describe("Проверка страницы Catalog", () => {
  it("Заголовок на странице должен иметь текст Delivery", () => {
    const basename = "/";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </BrowserRouter>
    );
    const { getAllByRole } = render(app);
  });
});
