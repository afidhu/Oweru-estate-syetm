import { PrismaService } from '../prisma.config/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAuth(): string;
    login(username: string, password: string): Promise<{
        id: string;
        username: string;
        email: string;
        role: string;
    } | null>;
}
