import axios, { AxiosResponse } from "axios";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../../../src/common/types";

export class mockExampleApi extends ExampleApi {
    async getProducts(): Promise<AxiosResponse<ProductShortInfo[], any>> {
        return await axios.get("/products");
    }

    async getProductById(id: number): Promise<AxiosResponse<Product, any>> {
        return await axios.get(`/products/${id}`);
    }

    async checkout(form: CheckoutFormData, cart: CartState): Promise<AxiosResponse<CheckoutResponse, any>> {
        return await axios.post(`/checkout`);
    }
}

export class mockCartApi extends CartApi {
    cart: CartState;
    constructor() {
        super();
        this.cart = {};
    }
    getState(): CartState {
        return this.cart;
    }

    setState(cart: CartState): void {
        this.cart = cart;
    }
}
