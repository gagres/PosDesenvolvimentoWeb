import Fastify from 'fastify';
import productRoutes from "./routes/products";
import fastifyMultipart from '@fastify/multipart';

const server = Fastify({logger: true});

server.register(fastifyMultipart, { limits: { fileSize: 10 * 1024 * 1024 } });
server.register(productRoutes, { prefix: '/products' });

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

