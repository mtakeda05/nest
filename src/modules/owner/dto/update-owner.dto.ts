import { IsString, IsEmail, IsArray, IsNotEmpty } from 'class-validator';

export class UpdateOwnerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsArray()
  customers: string[];
}
