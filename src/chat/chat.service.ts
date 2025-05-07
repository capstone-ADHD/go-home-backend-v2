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

    async saveMessage(dto: ChatModelDto) {
        const doc = new this.chatModel(dto);
        return await doc.save();
    }

    async getChats(room_id: string) {
        const models = await this.chatModel.find({ room_id }, {sender_name: 1, message: 1, _id: 0}).exec();
        //console.log(models);
        return { success: true, chat: models }
    }

}
