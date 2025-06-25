import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './schemas/chat-message.schema';
import { ChatModelDto } from './dto/chat-model.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from "typeorm";
import { User } from '../user/entities/user.entity';
import { roomMem } from 'src/room/entities/room-mem.entity';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class ChatService {
    private logger = new Logger(ChatService.name);

    constructor(
        private readonly firebaseService: FirebaseService,

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
        return { success: true, chat: models }
    }

    async sendPushMultiUser(room_id, sender_name: string, body: string) {
        // const res = await this.firebaseService.sendPushMultipleUser(
        //     dto.tokens,
        //     dto.title,
        //     dto.body
        // );
        
        const sender = await this.userRepo.find({ where: {
            user_name: sender_name
        } });
        if (!sender) return;

        const sender_id = sender[0].user_id;

        const mems = await this.roomMemRepo.find({ where: {
            room: { room_id }
        } });
        if (!mems) return;

        const pushIds = mems
            .filter(mem => mem.user_id != sender_id)
            .map(mem => mem.user_id);
        if (!pushIds) return;

        const pushUsers = await this.userRepo.find({ where: {
            user_id: In(pushIds)
        } });
        if (!pushUsers) return;

        const tokens = pushUsers.map(user => user.device_token);
        if (!tokens) return;

        const pushRoom = await this.roomRepo.find({ where: {
            room_id
        } });
        if (!pushRoom) return;

        const title = pushRoom[0].title;

        const res = await this.firebaseService.sendPushMultipleUser(tokens, title, body)
    }

}
