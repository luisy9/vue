import { BaseDto } from './base.dto';

export class LoginDto extends BaseDto {
    public user!: string;
    public password!: string;

    constructor(src?: any) {
        super(src);
    }
}
