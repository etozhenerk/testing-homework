import { rest } from "msw";
import { Product } from "../../../src/common/types";

export const handlers = [
    rest.get("/products", (_, res, ctx) => {
        const products: Product[] = [
            {
                id: 1,
                name: "product1",
                price: 99,
                description: "description",
                color: "white",
                material: "frozen",
            },
            {
                id: 2,
                name: "product2",
                price: 99,
                description: "description",
                color: "white",
                material: "frozen",
            },
            {
                id: 3,
                name: "product3",
                price: 99,
                description: "description",
                color: "white",
                material: "frozen",
            },
        ];

        return res(ctx.json(products));
    }),
    rest.get("/products/:id", (_, res, ctx) => {
        const product: Product = {
            id: 1,
            name: "product1",
            price: 99,
            description: "description",
            color: "white",
            material: "frozen",
        };

        return res(ctx.json(product));
    }),
    rest.post("/checkout", (_, res, ctx) => {
        return res(ctx.json({ id: 2 }));
    }),
];
