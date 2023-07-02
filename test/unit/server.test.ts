/**
 * @jest-environment node
 */

import axios from "axios";
import { CheckoutResponse, Order, ProductShortInfo } from "../../src/common/types";
import { isDefined } from "./utils/isDefined";

describe("Проверка запросов к серверу", () => {
    it("Метод api/products должен массив данных со всеми полями", async () => {
        const res = await axios.get<ProductShortInfo[]>("http://localhost:3000/hw/store/api/products");

        const isCorrectData = res.data.every(
            (item) => isDefined(item.id) && isDefined(item.name) && isDefined(item.price),
        );

        expect(isCorrectData).toBeTruthy();
    });

    it("Метод api/products/{id} должен возвращать данные продукта с переданным id", async () => {
        const id = 5;
        const res = await axios.get<ProductShortInfo>(`http://localhost:3000/hw/store/api/products/${id}`);

        const resId = res.data.id;

        expect(resId).toBe(id);
    });

    it("Метод api/checkout должен возвращать id заказа, который равен длинне списка заказов", async () => {
        const data = {
            form: {
                name: "Михаил Малахов",
                phone: "89777777777",
                address: "Москова",
            },
            cart: {
                "0": {
                    name: "test",
                    count: 1,
                    price: 405,
                },
            },
        };

        const checkoutRes = await axios.post<CheckoutResponse>("http://localhost:3000/hw/store/api/checkout", data);
        const orderRes = await axios.get<Order[]>("http://localhost:3000/hw/store/api/orders");

        const orderLength = orderRes.data.length;
        const checkoutId = checkoutRes.data.id

        expect(orderLength).toBe(checkoutId);
    });
});
