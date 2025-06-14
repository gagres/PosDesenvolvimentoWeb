import JwtService from './jwtService';

interface LoginCredentials {
    email: string;
    password: string;
}

export default class LoginService {
    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService();
    }

    async login(credentials: LoginCredentials): Promise<{ token: string }> {
        const payload = {
            userId: '12345', // This should be fetched from the database
            email: credentials.email,
            password: credentials.password, // Optional, used for login
        };

        const token = this.jwtService.generateToken(payload);

        return { token };
    }
}