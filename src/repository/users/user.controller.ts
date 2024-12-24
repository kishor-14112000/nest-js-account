import { Controller, Post, Body, Res, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "src/dto/user-login.dto";
import { Response, Request } from 'express';
import { UserService } from "./user.service";
import { AuthService } from "src/authentication/auth.service";

@Controller('auth')
export class UserController {
    constructor( 
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Body() payload: LoginDto, @Res() res: Response) {
        const token = await this.userService.login(payload);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });
        return res.status(200).json({
            message: 'Successfully Logged In!'
        });
    }
}