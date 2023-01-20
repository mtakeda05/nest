import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteOwnerCommand } from '../commands/delete-owner.command';
import { OwnerRepository } from '../owner.repository';

@CommandHandler(DeleteOwnerCommand)
export class DeleteOwnerHandler implements ICommandHandler<DeleteOwnerCommand> {
  constructor(private readonly repository: OwnerRepository) { }

  async execute(command: DeleteOwnerCommand) {
    return this.repository.delete(command.dto.id);
  }
}
