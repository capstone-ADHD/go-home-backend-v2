import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule,ConfigService } from '@nestjs/config';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService : ConfigService) => ({
                secret: configService.get<string>('JWTKEY'),
            })
        })
    ],
    providers:[UserService,JwtStrategy],
    exports:[UserService],
    controllers:[UserController]
})
export class UserModule {
}
