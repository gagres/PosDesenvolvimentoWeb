import { promises } from 'fs'; 
import path from 'path';
import ProductList from '../entities/productList';
import {Product, ProductCategory} from "skeleton/dist/types";
import {ProductNotFoundException} from "../exceptions/ProductNotFoundException";

export default class ProductRepository {
    private readonly outputFolder: string;

    constructor() {
        this.outputFolder = path.resolve('..', 'output');
    }

    private async getNextAvailableId(): Promise<string> {
        const allProducts = await this.getProducts();

        return allProducts.length() > 0 ? (parseInt(allProducts.last().id) + 1).toString() : "1";
    }

    async getProductById(id: string): Promise<Product> {
        const allProducts = await this.getProducts();
        const product = (await allProducts.filter((product) => (product.id === id))).first();

        return product ? product : (() => {throw new ProductNotFoundException(id)})();
    }

    async getProducts() {
        const data = await promises.readFile(path.join(this.outputFolder, 'processedProducts.json'));
        const productsAsJson = JSON.parse(data.toString());

        const products = new ProductList();
        for (const productData of productsAsJson) {
            const product = new Product(
                productData.id,
                productData.name,
                productData.description,
                productData.price,
                productData.category,
                productData.pictureUrl
            );
            products.push(product);
        }
        return products;
    }

    async createProduct(
        name: string,
        description: string,
        price: number,
        category: ProductCategory,
        pictureUrl: string
    ) {
        const product = new Product(await this.getNextAvailableId(), name, description, price, category, pictureUrl);

        const allProducts = await this.getProducts();
        allProducts.push(product);

        await this.saveOnFile(allProducts);

        return product;
    }

    async updateProduct(product: Product) {
        const allProducts = await this.getProducts();
        allProducts.replace(product);

        await this.saveOnFile(allProducts);

        return product;
    }

    async deleteProduct(id: string) {
        const allProducts = await this.getProducts();
        allProducts.forget(id);
        await this.saveOnFile(allProducts);
    }

    private async saveOnFile(products: ProductList) {
        const data = JSON.stringify(products.toArray());
        await promises.writeFile(path.join(this.outputFolder, 'processedProducts.json'), data);
    }
}