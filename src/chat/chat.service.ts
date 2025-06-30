import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './schemas/chat-message.schema';
import { ChatModelDto } from './dto/chat-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from "typeorm";
import { User } from '../user/entities/user.entity';
import { roomMem } from 'src/room/entities/room-mem.entity';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class ChatService {
    private logger = new Logger(ChatService.name);

    constructor(

        @InjectModel(ChatMessage.name) private chatModel: Model<ChatMessageDocument>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
        @InjectRepository(roomMem) private readonly roomMemRepo: Repository<roomMem>
    ) {}

    async saveMessage(dto: ChatModelDto) {
        const doc = new this.chatModel(dto);
        return await doc.save();
    }

    async getChats(room_id: string) {
        const models = await this.chatModel.find({ room_id }, {sender_name: 1, message: 1, _id: 0}).sort({ created_at: 1 }).exec();
        //console.log(models);
        
        if (models.length == 0) return { success: false, chat: [] }
        return { success: true, chat: models }
    }

}
