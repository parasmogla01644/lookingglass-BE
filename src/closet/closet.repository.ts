import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from '@sequelize/core';
import { ClosetFilter } from './dto/closet.dto';
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

  findAllCloset(userId: string, queryParams: ClosetFilter) {
    const whereCond = {};
    whereCond['user_id'] = userId;
    if (queryParams?.brand?.length) {
      whereCond['brand'] = {
        [Op.in]: queryParams.brand,
      };
    }

    if (queryParams?.category?.length) {
      whereCond['category'] = {
        [Op.in]: [...queryParams.category],
      };
    }

    if (queryParams?.color?.length) {
      whereCond['color'] = {
        [Op.in]: queryParams.color,
      };
    }

    if (queryParams?.season?.length) {
      whereCond['season'] = {
        [Op.in]: queryParams.season,
      };
    }
    return this.closet.findAll({
      where: whereCond,
    });
  }

  deleteCloset(userId: string, id: string) {
    return this.closet.destroy({
      where: {
        id,
        user_id: userId,
      },
    });
  }
}
