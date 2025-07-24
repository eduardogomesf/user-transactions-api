import { Transform } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { v7 as uuid } from 'uuid';

export class Entity {
  @IsUUID('7')
  @Transform(({ value }) => value ?? uuid())
  id: string;
}
