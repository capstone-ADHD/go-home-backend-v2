import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema()
export class ChatMessage {
    @Prop({ required: true })
    room_id: string;

    @Prop({ required: true })
    sender_name: string;

    @Prop({ required: true })
    message: string;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);