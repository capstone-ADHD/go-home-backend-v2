import { IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTokenDto {

    @ApiProperty({ example: 'device_token', description: '디바이스 토큰' })
    @IsString()
    dtoken: string;
}