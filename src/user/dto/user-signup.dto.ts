import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class UserSignupDto {
    @ApiProperty({ example: 'capstoneadhd@gmail.com', description: '이메일' })
    @IsEmail()
    email:string;

    @ApiProperty({ example: '12341234', description: '비밀번호' })
    @IsString()
    password:string;

    @ApiProperty({ example: '08대장윤재한', description: '이름' })
    @IsString()
    name:string;

    @ApiProperty({ example: 'f', description: '성별(f/m으로 남자 여자 구분)' })
    @IsString()
    sex:string;

    @ApiProperty({ example: '경북소프트웨어고등학교', description: '학교' })
    @IsString()
    school:string;

    @ApiProperty({ example: 'nh 120124912499', description: '계좌' })
    @IsString()
    account:string;
}