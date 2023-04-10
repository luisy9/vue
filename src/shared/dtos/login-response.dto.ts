import { BaseDto } from './base.dto';

export class LoginResponseDto extends BaseDto {
    public success!: boolean;
    public token!: string;

    constructor(src?: any) {
        super(src);
    }
}
