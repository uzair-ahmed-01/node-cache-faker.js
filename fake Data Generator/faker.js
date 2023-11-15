import { Product } from "../fake Data Generator/schema.js";
import { faker } from '@faker-js/faker';

export async function generateProducts(count = 10) {
    const products = [];

    for (let i = 0; i < count; i++) {
        const newProduct = {
            name: faker.commerce.productName(),
            photo: faker.image.url(),
            price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
            stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
            category: faker.commerce.department(),
            createdAt: new Date(faker.date.past()),
            updatedAt: new Date(faker.date.recent()),

        };
        products.push(newProduct)
    }
    await Product.create(products)
    console.log(products)
}

//generateProducts(50)