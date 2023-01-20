import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerModule } from './modules/owner/owner.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  providers: [
    OwnerModule
  ]
})
export class AppModule {}
