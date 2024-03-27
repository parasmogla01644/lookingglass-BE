import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClosetService } from './closet.service';
import {
  ClosetFilter,
  CreateClosetDto,
  GenerateSignedUrlDto,
} from './dto/closet.dto';

@Controller('closet')
export class ClosetController {
  constructor(private readonly closetService: ClosetService) {}

  @Post('signed-url')
  async generateSignedUrl(@Body() dto: GenerateSignedUrlDto) {
    return this.closetService.generatePresignedUrl(dto);
  }

  @Get('/categories')
  findCategories() {
    return this.closetService.findCategories();
  }

  @Post()
  create(@Body() createClosetDto: CreateClosetDto) {
    return this.closetService.createCloset(createClosetDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string, @Query() queryParams: ClosetFilter) {
    return this.closetService.findAllCloset(userId, queryParams);
  }

  @Delete(':userId/:id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.closetService.deleteCloset(userId, id);
  }
}
