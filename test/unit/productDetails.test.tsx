import React from "react";
import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { Product } from "../../src/common/types";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { ProductDetails } from "../../src/client/components/ProductDetails";

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

    const basename = "/";
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const app = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <ProductDetails product={product} />
        </Provider>
      </BrowserRouter>
    );

    const { getByRole } = render(app);

    const header = getByRole("heading").textContent;

    expect(header).toEqual(product.name);
  });
});
