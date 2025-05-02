import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserSignupDto } from "./dto/user-signup.dto";
import { UserService } from "./user.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";

@Controller("user") 
export class UserController {
    constructor (
        private readonly userService:UserService,
    ){}

    @Post("register")
    async Register(@Body() body:UserSignupDto) {
        const res = await this.userService.UserRegister(body);

        return res;
    }

    @Post("login")
    async Login(@Body() body:UserLoginDto) {
        const res = await this.userService.UserLogin(body); 
        
        return res;
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async UserProfile(@Req() req,) {
        const res = await this.userService.UserProfile(req.user_name);

        return res;
    }
}