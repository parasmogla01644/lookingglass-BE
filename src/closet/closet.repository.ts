import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { Closet } from './entities/closet.entity';

@Injectable()
export class ClosetRepository {
  constructor(
    @InjectModel(Category)
    private category: typeof Category,
    @InjectModel(Closet)
    private closet: typeof Closet,
  ) {}

  findAllCategory() {
    return this.category.findAll();
  }

  createCloset(payload) {
    return this.closet.bulkCreate(payload);
  }
}
