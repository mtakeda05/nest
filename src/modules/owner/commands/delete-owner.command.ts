import { ICommand } from '@nestjs/cqrs';
import { DeleteOwnerDto } from '../dto/delete-owner.dto';

export class DeleteOwnerCommand implements ICommand {
  constructor(public readonly dto: DeleteOwnerDto) {}
}
