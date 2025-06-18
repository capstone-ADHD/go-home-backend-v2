import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
    constructor(private readonly httpService: HttpService){}

    async getShcoolName(name: string) {
        const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${process.env.NEIS_API_KEY}&Type=json&SCHUL_NM=${name}`;
        const res = await firstValueFrom(
            this.httpService.get(url)
        );

        if (res.data.RESULT || res.data.schoolInfo[0].head[1].RESULT.CODE != 'INFO-000') {
            throw new NotFoundException("학교 정보를 불러 올 수 없습니다.");
        }

        return {success: true, list: res.data.schoolInfo[1].row}
    }
}