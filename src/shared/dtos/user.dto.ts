import { BaseDto } from "./base.dto";

export class UserDto extends BaseDto {
  public userName?: string;
  public name?: string;
  public displayName?: string;
  public email?: string;
  public isActive?: boolean;
  public hasAvatar?: boolean;
  public avatarPath?: string;
  public roleId?: string;
  public roleName?: string;
}
