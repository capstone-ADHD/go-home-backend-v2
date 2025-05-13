import { IsEmail, IsString } from "class-validator";


export class UserSignupDto {
    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsString()
    name:string;

    @IsString()
    sex:string;

    @IsString()
    school:string;

    @IsString()
    account:string;
}