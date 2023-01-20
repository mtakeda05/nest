import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateOwnerCommand } from '../commands/create-owner.command';
import { OwnerRepository } from '../owner.repository';
import { generateUniqueId } from 'src/shared/utils';

@CommandHandler(CreateOwnerCommand)
export class CreateOwnerHandler implements ICommandHandler<CreateOwnerCommand> {
  constructor(private readonly repository: OwnerRepository) { }

  async execute(command: CreateOwnerCommand) {
    const newId = generateUniqueId();
    const ownerWithId = await this.repository.findOne(newId);
    if (ownerWithId) {
      throw new Error(`Owner with id ${newId} already exists.`);
    }
    command.dto.id = newId;
    return this.repository.create(command.dto);
  }
}
