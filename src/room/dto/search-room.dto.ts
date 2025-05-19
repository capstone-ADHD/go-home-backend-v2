import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SearchRoomDto {
    @ApiProperty({ example: '구미 가시는 분', description: '제목' })
    @IsOptional()
    @IsString({})
    title?:string;

    @ApiProperty({ example: '경소고', description: '출발지' })
    @IsOptional()
    @IsString()
    from?:string;

    @ApiProperty({ example: '구미역', description: '도착지' })
    @IsOptional()
    @IsString()
    to?:string;

    @ApiProperty({ example: '6월 12일 오후4시', description: '출발 시간' })
    @IsOptional()
    @IsString()
    meet_at?:string;    
}