import { Injectable } from '@nestjs/common';
import { ClosetRepository } from './closet.repository';
import { CreateClosetDto } from './dto/create-closet.dto';
import { UpdateClosetDto } from './dto/update-closet.dto';
import { Closet } from './entities/closet.entity';

@Injectable()
export class ClosetService {
  constructor(private readonly closetRepo: ClosetRepository) {}

  async createCloset(payload: CreateClosetDto) {
    const newCloset = [];
    const { category, brand, color, season, video, image } = payload;
    video.forEach((ele) => {
      const closet = new Closet();
      closet.category = category;
      closet.brand = brand;
      closet.color = color;
      closet.season = season;
      closet.url = ele;
      closet.type = 'video';
      newCloset.push(closet);
    });

    image.forEach((ele) => {
      const closet = new Closet();
      closet.category = category;
      closet.brand = brand;
      closet.color = color;
      closet.season = season;
      closet.url = ele;
      closet.type = 'image';
      newCloset.push(closet);
    });
    await this.closetRepo.createCloset(newCloset);
    return 'Success';
  }

  findAll() {
    return `This action returns all closet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} closet`;
  }

  update(id: number, updateClosetDto: UpdateClosetDto) {
    return `This action updates a #${id} closet`;
  }

  remove(id: number) {
    return `This action removes a #${id} closet`;
  }

  async findCategories() {
    const result = await this.closetRepo.findAllCategory();
    console.log(result);

    return result;
  }
}
