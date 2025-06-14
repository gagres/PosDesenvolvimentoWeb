// 1. Extend FastifyRequest to include a `user` property
import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            userId: string;
            email: string;
        };
    }
}