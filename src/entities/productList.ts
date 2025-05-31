import {Product} from "skeleton/dist/types";
import {ProductNotFoundException} from "../exceptions/ProductNotFoundException";

export default class ProductList implements Iterable<Product> {
    private products: Product[] = [];

    push(product: Product) {
        this.products.push(product);
    }

    replace(product: Product) {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index < 0) throw new ProductNotFoundException(product.id);
        this.products[index] = product;
    }

    forget(id: string) {
        const index = this.products.findIndex(p => p.id === id);
        if (index < 0) throw new ProductNotFoundException(id);
        this.products.splice(index, 1);
    }

    first = () => this.products[0];
    last = () => this.products[this.products.length - 1];
    length = () => this.products.length;

    async filter(callback: (product: Product) => boolean): Promise<ProductList> {
        const filteredProducts = new ProductList();
        for (const product of this.products) {
            if (callback(product)) {
                filteredProducts.push(product);
            }
        }
        return filteredProducts;
    }

    toArray(): Array<Object> {
        return Array.from(this.products).map((product: Product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category.valueOf(),
            pictureUrl: product.pictureUrl
        }))
    }

    *[Symbol.iterator](): Iterator<Product> {
        for (const item of this.products) {
          yield item;
        }
    }
}