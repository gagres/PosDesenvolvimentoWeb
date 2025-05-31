export class ProductNotFoundException extends Error {
    constructor(productId: string) {
        super(`Product with ID '${productId}' could not be found.`);
    }
}