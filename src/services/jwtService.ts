import jwt from 'jsonwebtoken';
import InvalidTokenException from '../exceptions/InvalidTokenException';

interface JwtPayload {
    userId: string;
    email: string;
    password?: string; // Optional, used for login
}

export default class JwtService {
    private secretKey: string;
    private expiresIn: jwt.SignOptions['expiresIn'];

    constructor() {
        this.secretKey = process.env.JWT_SECRET!;
        this.expiresIn = (process.env.JWT_EXPIRY_IN as jwt.SignOptions['expiresIn']) || '24h';
    }

    generateToken(payload: JwtPayload): string {
        const options: jwt.SignOptions = {
            expiresIn: this.expiresIn,
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
            subject: payload.userId.toString(),
        }

        return jwt.sign(payload, this.secretKey, options);
    }

    generateRefreshToken(userId: string): string {
        return jwt.sign(
            { userId: userId, type: 'refresh' },
            this.secretKey,
            { expiresIn: '7d' },
        );
    }

    verifyToken(token: string): jwt.JwtPayload | null {
        try {
            return jwt.verify(token, this.secretKey) as jwt.JwtPayload;
        } catch (error) {
            throw new InvalidTokenException();
        }
    }
}