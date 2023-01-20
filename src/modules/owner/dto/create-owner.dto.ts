import { IsString, IsEmail, IsNotEmpty, IsArray } from 'class-validator';

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
  customers: string[];
}
