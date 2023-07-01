import React, { ReactNode } from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { initStore } from "../../../src/client/store";
import { render } from "@testing-library/react";
import { mockCartApi, mockExampleApi } from "../mocks/api";
import events from "@testing-library/user-event";

interface RenderAppProps {
    children: ReactNode;
    cartApi?: mockCartApi;
    mockApi?: mockExampleApi;
}

export const renderApp = ({ children, cartApi, mockApi }: RenderAppProps) => {
    const basename = "";
    const api = mockApi || new mockExampleApi(basename);
    const cart = cartApi || new mockCartApi();
    const store = initStore(api, cart);

    const app = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>{children}</Provider>
        </BrowserRouter>
    );

    return {
        user: events.setup(),
        basename,
        ...render(app),
    };
};
