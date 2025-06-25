import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString,IsNumber } from "class-validator"

export class CreateRoomDto {
  @ApiProperty({ example: '집 가실분', description: '방 제목' })
  @IsString()
  title:string;

  @ApiProperty({ example: '2024년 5월 23일', description: '만날 시간' })
  @IsString()
  meet_at:string;

  @ApiProperty({ example: '경북소프트웨어고등학교', description: '출발지' })
  @IsString()
  from:string;

  @ApiProperty({ example: '구미역', description: '목적지' })
  @IsString()
  to:string;

  @ApiProperty({ example: '경북소프트웨어고등학교', description: '학교이름' })
  @IsString()
  school_name:string;

  @ApiProperty({ example: '4', description: '최대 인원' })
  @Type(() => Number)
  @IsNumber()
  max_amount:number;
}
