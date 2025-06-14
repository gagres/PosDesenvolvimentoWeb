if (process.env.ENV === 'development') {
  console.log('Running on development mode');
  require('dotenv').config({ path: '../.env' });
}

import Fastify from 'fastify';
import productRoutes from "./routes/products";
import loginRoutes from './routes/login';
import fastifyMultipart from '@fastify/multipart';

const server = Fastify({logger: true});

server.register(fastifyMultipart, { limits: { fileSize: 10 * 1024 * 1024 } });
server.register(productRoutes, { prefix: '/products' });
server.register(loginRoutes);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

