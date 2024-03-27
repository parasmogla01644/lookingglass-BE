import { Injectable } from '@nestjs/common';
import { ClosetRepository } from './closet.repository';
import { CreateClosetDto } from './dto/create-closet.dto';
import { UpdateClosetDto } from './dto/update-closet.dto';

@Injectable()
export class ClosetService {
  constructor(private readonly closetRepo: ClosetRepository) {}

  async createCloset(payload: CreateClosetDto) {
    try {
      const newCloset = [];
      const { category, brand, color, season, video, image, email, user_id } =
        payload;
      video.forEach((ele) => {
        const closet = {
          email,
          user_id,
          category: category,
          brand: brand,
          color: color,
          season: season,
          url: ele,
          type: 'video',
        };
        newCloset.push(closet);
      });

      image.forEach((ele) => {
        const closet = {
          email,
          user_id,
          category: category,
          brand: brand,
          color: color,
          season: season,
          url: ele,
          type: 'image',
        };
        newCloset.push(closet);
      });
      console.log(newCloset);

      await this.closetRepo.createCloset(newCloset);
      return 'Success';
    } catch (error) {
      console.log(error);
    }
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
    return result;
  }
}
