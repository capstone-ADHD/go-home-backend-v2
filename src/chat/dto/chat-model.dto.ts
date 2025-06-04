import { IsString } from 'class-validator';

export class ChatModelDto {
    @IsString()
    room_id: string;
    
    @IsString()
    sender_name: string;

    @IsString()
    message: string;
}