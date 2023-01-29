import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateOwnerCommand } from '../commands/create-owner.command';
import { OwnerRepository } from '../owner.repository';
import { generateUniqueId } from '../../../shared/utils';
import { Customer } from '../../customer/interfaces/customer.interface';

@CommandHandler(CreateOwnerCommand)
export class CreateOwnerHandler implements ICommandHandler<CreateOwnerCommand> {
  constructor(
    private readonly repository: OwnerRepository,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

  async execute(command: CreateOwnerCommand) {
    const newId = generateUniqueId();
    const ownerWithId = await this.repository.findOne(newId);
    if (ownerWithId) {
      throw new Error(`Owner with id ${newId} already exists.`);
    }
    if ((command.dto.customers || []).length > 0) {
      const items = await this.customerModel.find({ _id: { $in: command.dto.customers } }).exec();
      if (command.dto.customers.length !== items.length) {
        throw new Error(`Invalid customer id.`);
      }
    }

    command.dto.id = newId;
    return this.repository.create(command.dto);
  }
}
