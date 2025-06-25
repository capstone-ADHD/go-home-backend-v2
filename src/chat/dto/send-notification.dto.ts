import { IsString } from 'class-validator';

export class SendNotificationDto {
    tokens: string[];

    @IsString()
    title: string;
    
    @IsString()
    body: string;
}