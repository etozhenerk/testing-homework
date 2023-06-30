import axios, { AxiosStatic } from 'axios';
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../common/types';

export class ExampleApi {
    axios: AxiosStatic;
    constructor(private readonly basename: string, axiosClass?: AxiosStatic) {
        this.axios = axiosClass || axios;
    }

    async getProducts() {
        return await this.axios.get<ProductShortInfo[]>(`${this.basename}/api/products`);
    }

    async getProductById(id: number) {
        return await this.axios.get<Product>(`${this.basename}/api/products/${id}`);
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        return await this.axios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart });
    }
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export class CartApi {
    getState(): CartState {
        try {
            const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            return JSON.parse(json) as CartState || {};
        } catch {
            return {};
        }
    }

    setState(cart: CartState) {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }
}