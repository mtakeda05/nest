import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateOwnerCommand } from '../commands/update-owner.command';
import { OwnerRepository } from '../owner.repository';

@CommandHandler(UpdateOwnerCommand)
export class UpdateOwnerHandler implements ICommandHandler<UpdateOwnerCommand> {
  constructor(private readonly repository: OwnerRepository) { }

  async execute(command: UpdateOwnerCommand) {
    const owner = await this.repository.findOne(command.dto.id);
    if (!owner) {
      throw new Error(`Owner with id ${command.dto.id} not found.`);
    }
    // Iterate over the properties of the dto and pick up non empty value only.
    Object.entries(command.dto).forEach(([key, value]) => {
      if (value) {
        Object.assign(owner, { [key]: value });
      }
    });

    return this.repository.update(command.dto);
  }
}
