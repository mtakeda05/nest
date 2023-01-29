import { IsString, IsEmail, IsArray, IsNotEmpty } from 'class-validator';
import * as mongodb from 'mongodb';

export class UpdateOwnerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  customers: mongodb.ObjectId[];
}
