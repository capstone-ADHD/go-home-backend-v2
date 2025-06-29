import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserSignupDto } from "./dto/user-signup.dto";
import { UserService } from "./user.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateTokenDto } from "./dto/update-token.dto";

@Controller("user") 
export class UserController {
    constructor (
        private readonly userService:UserService,
    ){}

    @Post("register")
    @ApiOperation({ summary: '회원가입', description: '회원가입' })
    @ApiResponse({ status: 201, description: '성공적으로 회원가입함ㅇㅇ' })
    async Register(@Body() body:UserSignupDto) {
        const res = await this.userService.userRegister(body);

        return res;
    }

    @Post("login")
    @ApiOperation({ summary: '로그인', description: '로그인' })
    @ApiResponse({ status: 200, description: '성공적으로 로그인 함ㅇㅇ' })
    async Login(@Body() body:UserLoginDto) {
        const res = await this.userService.userLogin(body); 
        
        return res;
    }
  
    @Get("profile")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '프로필', description: '프로필 정보를 불러옴' })
    @ApiResponse({ status: 200, description: '성공적으로 프로필을 불러옴' })
    async UserProfile(@Req() req,) {
        const res = await this.userService.userProfile(req.user.profile.name);

        return res;
    }

    @Post("token")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '토큰 업데이트', description: '유저의 디바이스 토큰을 업데이트' })
    @ApiResponse({ status: 201, description: '토큰 업데이트 성공' })
    async updateDeviceToken(@Req() req, @Body() body: UpdateTokenDto) {
        const res = await this.userService.updateDeviceToken(req.user.profile.id, body.dtoken);

        return res;
    }
}
