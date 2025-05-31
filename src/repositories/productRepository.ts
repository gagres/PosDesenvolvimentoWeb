import {Product, ProductCategory} from "skeleton/dist/types";
import {ProductNotFoundException} from "../exceptions/ProductNotFoundException";
import { Knex } from 'knex';
export default class ProductRepository {
    constructor(private db: Knex) {}

    async getProductById(id: string): Promise<Product> {
        const product = await this.db<Product>('products').where('id', '=', id).first();
        if (!product) {
            throw new ProductNotFoundException(id);
        }
        return product;
    }

    async getProducts() {
        return await this.db<Product>('products');
    }

    async createProduct(
        name: string,
        description: string,
        price: number,
        category: ProductCategory,
        pictureUrl: string
    ): Promise<Product> {
        return this.db.transaction(async (trx) => {
            try {
                const [product] = await this.db<Product>('products').insert({
                    name,
                    description,
                    price,
                    category,
                    pictureUrl
                }).returning('id');

                return new Product(product.id, name, description, price, category, pictureUrl);
            } catch (error) {
                console.error('Error creating product:', error);
                throw error;
            }
        });
    }
    
    async updateProduct(product: Product) {
        return this.db.transaction(async (trx) => {
            try {
                await this.db<Product>('products')
                    .where({ id: product.id })
                    .update(product)
                    .returning('id');

                return product;
            } catch (error) {
                console.error('Error updating product:', error);
                throw error;
            }
        });
    }

    async deleteProduct(id: string) {
        const [product] = await this.db<Product>('products').where('id', '=', id).delete().returning('id');
        console.log(`Product with ID ${product.id} deleted successfully.`);
    }
}