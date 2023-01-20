import { ICommand } from '@nestjs/cqrs';
import { UpdateOwnerDto } from '../dto/update-owner.dto';

export class UpdateOwnerCommand implements ICommand {
  constructor(public readonly dto: UpdateOwnerDto) {}
}
