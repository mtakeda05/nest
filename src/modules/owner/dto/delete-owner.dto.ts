import { IsString } from 'class-validator';

export class DeleteOwnerDto {
  @IsString()
  id: string;
}
