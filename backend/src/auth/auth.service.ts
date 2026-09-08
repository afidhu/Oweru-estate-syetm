import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.config/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    getAuth():string{
        return "hellow uth";
    }

    async login(username: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: { username },
            select: { id: true, username: true, email: true, password: true, role: true },
        });
        if (!user || user.password !== password) return null;
        const { password: _password, ...safeUser } = user;
        return safeUser;
    }
}
