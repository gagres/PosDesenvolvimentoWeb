import {FastifyInstance} from "fastify";
import ProductRepository from "../repositories/productRepository";
import {ProductNotFoundException} from "../exceptions/ProductNotFoundException";
import {Product, ProductCategory} from "skeleton/dist/types";
import {UploadService} from "../services/uploadService";
import {FileNotFoundException} from "../exceptions/FileNotFoundException";
import {productSchema} from "../schemas/product";

const uploadService = new UploadService();
const productRepository = new ProductRepository();

const routes = (fastify: FastifyInstance) => {
    fastify.addHook('onRequest', (request, reply, done) => {
        console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
        done();
    });

    fastify.setErrorHandler((err, request, reply) => {
        if (err instanceof ProductNotFoundException) {
            return reply.status(404).send({ error: err.message });
        }

        if (err instanceof FileNotFoundException) {
            return reply.status(404).send({ error: 'Image file not found on server' });
        }

        return reply.status(500).send({ error: 'Internal server error' });
    });

    fastify.get('/', async (request, reply) => {
        const products = await productRepository.getProducts();
        reply.send(products.toArray());
    });

    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };

        const product = await productRepository.getProductById(id);
        return reply.send(product);
    });

    fastify.post('/', {
        schema: productSchema,
        handler: async (request, reply) => {
            const { name, description, price, category, pictureUrl } = request.body as {
                name: string;
                description: string;
                price: number;
                category: ProductCategory;
                pictureUrl: string;
            };

            return productRepository.createProduct(name, description, price, category, pictureUrl);
        }
    });

    fastify.put('/:id', {
        schema: productSchema,
        handler: async (request, reply) => {
            const { id } = request.params as { id: string };
            const { name, description, price, category, pictureUrl } = request.body as {
                name: string;
                description: string;
                price: number;
                category: ProductCategory;
                pictureUrl: string;
            };

            return productRepository.updateProduct(new Product(id, name, description, price, category, pictureUrl));
        }
    });

    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        await productRepository.deleteProduct(id);
        reply.code(204).send();
    });

    fastify.get('/:id/image', async (request, reply) => {
        const { id } = request.params as { id: string };
        const product = await productRepository.getProductById(id);
        const file = await uploadService.get(product.pictureUrl);
        reply.header('Content-Type', file.contentType);

        return reply.send(file.stream);
    });

    fastify.put('/:id/image', async (request, reply) => {
        const { id } = request.params as { id: string };

        const file = await request.file();
        if (!file) return reply.status(400).send({ error: 'Missing image file.' });

        const product = await productRepository.getProductById(id);
        product.pictureUrl = await uploadService.upload(id, file);
        await productRepository.updateProduct(product);

        return reply.code(200).send();
    });
};

export default routes;