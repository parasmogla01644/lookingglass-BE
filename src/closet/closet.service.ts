import { BadRequestException, Injectable } from '@nestjs/common';
import { ClosetRepository } from './closet.repository';
import {
  ClosetFilter,
  CreateClosetDto,
  GenerateSignedUrlDto,
} from './dto/closet.dto';
import { MediaService } from './media.service';

@Injectable()
export class ClosetService {
  generatePresignedUrl(payload: GenerateSignedUrlDto) {
    return this.mediaService.generatePresignedUrl(payload);
  }
  constructor(
    private readonly closetRepo: ClosetRepository,
    private readonly mediaService: MediaService,
  ) {}

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
      await this.closetRepo.createCloset(newCloset);
      return 'Success';
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAllCloset(userId: string, queryParams: ClosetFilter) {
    try {
      return await this.closetRepo.findAllCloset(userId, queryParams);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong');
    }
  }

  async findCategories() {
    const result = await this.closetRepo.findAllCategory();
    return result;
  }

  async deleteCloset(userId: string, id: string) {
    try {
      await this.closetRepo.deleteCloset(userId, id);
      return 'success';
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong');
    }
  }
}
