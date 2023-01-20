import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { OwnerSchema } from 'src/shared/models/owner.schema';
import { CreateOwnerHandler } from './handlers/create-owner.handler';
import { UpdateOwnerHandler } from './handlers/update-owner.handler';
import { DeleteOwnerHandler } from './handlers/delete-owner.handler';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Owner', schema: OwnerSchema }])],
  controllers: [OwnerController],
  providers: [
    OwnerService, 
    CreateOwnerHandler, 
    UpdateOwnerHandler, 
    DeleteOwnerHandler
  ],
})
export class OwnerModule {}
