import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateOwnerCommand } from '../commands/update-owner.command';
import { OwnerRepository } from '../owner.repository';
import { Customer } from '../../customer/interfaces/customer.interface';

@CommandHandler(UpdateOwnerCommand)
export class UpdateOwnerHandler implements ICommandHandler<UpdateOwnerCommand> {
  constructor(
    private readonly repository: OwnerRepository,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

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

    if ((command.dto.customers || []).length > 0) {
      const items = await this.customerModel.find({ _id: { $in: command.dto.customers } }).exec();
      if (command.dto.customers.length !== items.length) {
        throw new Error(`Invalid customer id.`);
      }
    }

    return this.repository.update(command.dto);
  }
}
