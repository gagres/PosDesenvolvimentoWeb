
import {FastifyInstance} from "fastify";
import LoginService from "../services/loginService";

const loginService = new LoginService();

const routes = (fastify: FastifyInstance) => {
    fastify.addHook('onRequest', (request, reply, done) => {
        console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
        done();
    });

    fastify.post('/login', async (request, reply) => {
        reply.send(await loginService.login(request.body as { email: string; password: string }));
    });
};

export default routes;