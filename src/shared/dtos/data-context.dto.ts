
import { BaseDto } from './base.dto';
import { UserDto } from './user.dto';
export class DataContextDto extends BaseDto {
  user?: UserDto;
  generatorsList?: [];
}
