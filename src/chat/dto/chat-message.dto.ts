import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatData {
    @IsString()
    sender_name: string;

    @IsString()
    message: string;
}

export class ChatMessageDto {
    @IsString()
    room_id: string;

    @ValidateNested()
    @Type(() => ChatData)
    data: ChatData;
}