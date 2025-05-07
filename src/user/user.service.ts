import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
            private readonly userRepo : Repository<User>,
            private readonly jwtService : JwtService
    ){}

        async userRegister(userSignupDto) {
            const {email,password,name,sex,school,account} = userSignupDto;     

            const idExist = await this.userRepo.findOne({where : {user_name : name}});
            if(idExist) {
                throw new BadRequestException("user_name already exists");
            }

            const emailExist = await this.userRepo.findOne({ where : {user_email : email}});
            if(emailExist) {
                throw new BadRequestException("email already exists");
            }

            const hashedPw = await bcrypt.hash(password,10);

            const res = await this.userRepo.save({
                user_email:email,
                user_pw:hashedPw,
                user_name:name,
                sex:sex,
                school:school,
                account:account        
            });

            return {
                "success":true
            };  
            
    }

    async userLogin(userLoginDto) {
        const {email,password} = userLoginDto;

        const emailRes = await this.userRepo.findOne({where : {user_email:email}})
        if(!emailRes) {
           throw new BadRequestException("email does not exsist");
        }

        const pwRes = await bcrypt.compare(password,emailRes.user_pw);
        if(!pwRes) {
            throw new BadRequestException("password or email incorrect");
        }
        
        const name = emailRes.user_name;
        const Token = this.jwtService.sign({email,name},{expiresIn : "7d"});

        return {
            "success":true,
            "token":Token
        };
    }

    async userProfile(name : string) {
        const res = await this.userRepo.findOne({where : {user_name: name}})

        if(!res) {
            throw new BadRequestException("user not found")
        }

        const { user_pw, ...user} = res;
        return {
            "success": true,
            user
        }
    } 
}