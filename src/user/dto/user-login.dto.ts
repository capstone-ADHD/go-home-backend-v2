import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
    @ApiProperty({ example: 'capstoneadhd@gmail.com', description: '이메일' })
    @IsEmail()
    email:string;

    @ApiProperty({ example: '12341234', description: '비밀번호' })
    @IsString()
    password:string;
}