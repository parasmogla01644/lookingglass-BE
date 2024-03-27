import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClosetService } from './closet.service';
import { CreateClosetDto, GenerateSignedUrlDto } from './dto/create-closet.dto';
import { UpdateClosetDto } from './dto/update-closet.dto';
import { MediaService } from './media.service';

@Controller('closet')
export class ClosetController {
  constructor(
    private readonly closetService: ClosetService,
    private readonly mediaService: MediaService,
  ) {}

  @Post('signed-url')
  async generateSignedUrl(@Body() dto: GenerateSignedUrlDto) {
    return this.mediaService.generatePresignedUrl(dto);
  }

  @Get('/categories')
  findCategories() {
    return this.closetService.findCategories();
  }

  @Post()
  create(@Body() createClosetDto: CreateClosetDto) {
    return this.closetService.createCloset(createClosetDto);
  }

  @Get()
  findAll() {
    return this.closetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.closetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClosetDto: UpdateClosetDto) {
    return this.closetService.update(+id, updateClosetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.closetService.remove(+id);
  }
}
