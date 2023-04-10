import { BaseDto } from "./base.dto";

export class LoginResultDto extends BaseDto {
  public message!: string;
  public success!: boolean;
  public token!: string;
}
