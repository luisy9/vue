
import { BaseDto } from './base.dto';
export class ItemStepperDto extends BaseDto {
  title?: string;
  state?: boolean;
  multiple?: boolean;
  list: Array<string>;
  listSelected: Array<string>;
  theme?: string;
  data?: any;
  required?:boolean;

  constructor(src?: any) {
    super(src);
    if (src == null) {
        this.list = [];
        this.listSelected = [];
    } else {
      this.list = src.list;
      this.listSelected = src.listSelected;
    }
  }

  public get stateItem() {
    return this.state;
  }

}
