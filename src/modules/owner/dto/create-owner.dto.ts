import { IsString, IsEmail, IsNotEmpty, IsArray } from 'class-validator';
import * as mongodb from 'mongodb';

export class CreateOwnerDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  customers: mongodb.ObjectId[];
}
