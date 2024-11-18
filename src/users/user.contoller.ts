import { Controller, Post, Body } from "@nestjs/common";
import { LoginDto } from "src/dto/user-login.dto";
import { UserService } from "./user.service";

@Controller('auth')
export class UserController {
    constructor( private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() payload: LoginDto) {
        return await this.userService.login(payload);
    }
}