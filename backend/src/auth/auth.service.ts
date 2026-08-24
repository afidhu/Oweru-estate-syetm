import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    getAuth():string{
        return "hellow uth";
    }
}
