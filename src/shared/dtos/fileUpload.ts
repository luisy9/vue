import { BaseDto } from "./base.dto";

export class FileUploadDto extends BaseDto {
    public idStudy!: number;
    public file!: any;

    constructor(src?: any) {
        super(src);
    }
}
