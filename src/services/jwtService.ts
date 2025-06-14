import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    email: string;
}

class JwtService {
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
}