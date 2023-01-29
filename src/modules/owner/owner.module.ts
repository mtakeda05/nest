import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { OwnerSchema } from '../../shared/models/owner.schema';
import { OwnerRepository } from './owner.repository';
import { CommandHandlers } from './handlers';
import { CustomerSchema } from '../../shared/models/customer.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Owner', schema: OwnerSchema },
    { name: 'Customer', schema: CustomerSchema }
  ]), CqrsModule],
  controllers: [OwnerController],
  providers: [
    OwnerService,
    OwnerRepository,
    ...CommandHandlers
  ],
})
export class OwnerModule {}
