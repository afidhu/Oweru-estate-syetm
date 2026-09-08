import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Get()
    getAuth(){
        return this.authService.getAuth();
    }

    @Post('login')
    async login(@Body() credentials: { username: string; password: string }) {
        const user = await this.authService.login(credentials.username, credentials.password);
        if (!user) throw new UnauthorizedException('Invalid username or password');
        return user;
    }
}
