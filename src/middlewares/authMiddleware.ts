import { FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        reply.code(401).send({ error: 'Authorization header required' });
        return;
    }

    if (!authHeader.startsWith('Bearer ')) {
        reply.code(401).send({ error: 'Bearer token required' });
        return;
    }

    const token = authHeader.slice(7); // Remove 'Bearer '

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        request.user = {
            userId: decoded.userId,
            email: decoded.email,
        };

        return;
    } catch (error) {
        reply.code(401).send({ error: 'Invalid token' });
        return;
    }
}