import { ICommand } from '@nestjs/cqrs';
import { CreateOwnerDto } from '../dto/create-owner.dto';

export class CreateOwnerCommand implements ICommand {
  constructor(public readonly dto: CreateOwnerDto) {}
}
