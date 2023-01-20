import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { DeleteOwnerDto } from './dto/delete-owner.dto';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    return await this.ownerService.create(createOwnerDto);
  }

  @Get()
  async findAll() {
    return await this.ownerService.findAll();
  }

  @Put()
  async update(@Body() ownerDto: UpdateOwnerDto) {
    return await this.ownerService.update(ownerDto);
  }

  @Delete()
  async delete(@Body() ownerDto: DeleteOwnerDto) {
    return await this.ownerService.delete(ownerDto);
  }
}
