import { getMetadataArgsStorage, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { roomMem } from './entities/room-mem.entity';
import { range } from 'rxjs';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
      private readonly roomRepo : Repository<Room>,

    @InjectRepository(roomMem)
      private readonly roomMemRepo : Repository<roomMem>,
  ){}

  async create(createRoomDto,user_id) {
    const { title,meet_at,from,to,school_name,max_amount } = createRoomDto;

    const res = await this.roomRepo.save({
      title:title,
      owner_id:user_id,
      meet_at:meet_at,
      from:from,
      to:to,
      school:school_name,
      max_amount:max_amount,
    });

    const addres = await this.roomMemRepo.save({
        room:{room_id:res.room_id},
        user_id:user_id
      });

    return {
      "success": true,
      "room_id": res.room_id
    };
  }

  async search(searchRoomDto,school_name) {  
    const {title,from,to,meet_at} = searchRoomDto;

    let res:any = await this.roomRepo.find({
      where: { 
        title:title,
        from:from,
        to:to,
        meet_at:meet_at,
        school:school_name
      }
    });

    if (res.length === 0) {
      return {
        "succes": false
      };
    }

    for (let i = 0; i < res.length; i++) {
      const room_id = res[i].room_id;
      
      res[i] = {
        ...res[i],
        now_amount: await this.roomMemRepo.count({ where: { room: { room_id: res[i].room_id } } })
      };  
    }

    return {
      success: true,
      "data":res
    };
  }

  async join(room_id:number,user_id:number) {
    try {

      const eres = await this.roomRepo.findOne ({where: { room_id : room_id }})

      if(eres === null) {
        throw new BadRequestException("room does not exist");
      }

      const sres = await this.roomMemRepo.findOne({
        where: {
          room: {room_id:room_id},
          user_id:user_id
        },
      });

      if(sres !== null) {
        throw new BadRequestException("already joined");
      }
      
      const res = await this.roomMemRepo.save({
        room:{room_id:room_id},
        user_id:user_id
      });

      return {
      "success":true
      }
    } catch(e) {
      throw new BadRequestException("wrong request!");
    }
  }

  async exit(room_id,user_id) {
    try {

      const target = await this.roomMemRepo.findOne ({
        where: {
            room: {room_id:room_id},
          user_id:user_id, 
        }})

      if(target === null) {
        throw new BadRequestException("room does not exist");
      }

      const res = await this.roomMemRepo.remove(target);

      return {
        "success": true
      }
    
    } catch(e) {
      throw new BadRequestException("wrong request!");
    }
  }
}
