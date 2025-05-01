import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './schemas/chat-message.schema';
import { ChatModelDto } from './dto/chat-model.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(ChatMessage.name) private chatModel: Model<ChatMessageDocument>
    ) {}

    async create(dto: ChatModelDto) {
        const doc = new this.chatModel(dto);
        return doc.save();
    }

}
