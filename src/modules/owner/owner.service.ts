import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOwnerCommand } from './commands/create-owner.command';
import { UpdateOwnerCommand } from './commands/update-owner.command';
import { DeleteOwnerCommand } from './commands/delete-owner.command';
import { OwnerRepository } from './owner.repository';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { DeleteOwnerDto } from './dto/delete-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly ownerRepository: OwnerRepository,
  ) { }

  async create(ownerDto: CreateOwnerDto) {
    return await this.commandBus.execute(new CreateOwnerCommand(ownerDto));
  }

  async update(ownerDto: UpdateOwnerDto) {
    return await this.commandBus.execute(new UpdateOwnerCommand(ownerDto));
  }

  async delete(ownerDto: DeleteOwnerDto) {
    return await this.commandBus.execute(new DeleteOwnerCommand(ownerDto));
  }

  async findAll() {
    return await this.ownerRepository.findAll();
  }

  async findOne(id: string) {
    return await this.ownerRepository.findOne(id);
  }

  async clean() {
    return await this.ownerRepository.clean();
  }
}
