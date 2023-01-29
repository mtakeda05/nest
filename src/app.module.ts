import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerModule } from './modules/owner/owner.module';

import { isTest } from './shared/utils';
import { config } from '../config';
const mongoUrl = isTest() ? config.test.mongoUrl : config.production.mongoUrl;

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
  ],
  providers: [
    OwnerModule
  ]
})
export class AppModule {}
