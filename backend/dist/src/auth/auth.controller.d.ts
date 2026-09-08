import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    login(credentials: {
        username: string;
        password: string;
    }): Promise<{
        id: string;
        username: string;
        email: string;
        role: string;
    }>;
}
