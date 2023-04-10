
import NttTextBox from '@/shared/components/ntt-textbox/ntt-textbox.component.vue';
import { ItemStepperDto } from '@/shared/dtos/item-stepper.dto';
import { messageService } from '@/shared/services/message-service';
import { NttString } from '@/shared/utils/ntt-string';
import { DxAccordion, DxRadioGroup, DxSlider, DxTagBox, DxTooltip } from 'devextreme-vue';
import { DxLabel } from 'devextreme-vue/bar-gauge';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';

@Options({
    components: { DxAccordion, DxTagBox, DxRadioGroup, DxSlider, DxTooltip, DxLabel, DxFileUploader, NttTextBox }
  })

export default class NttAccordionComponent extends Vue {
    @Prop({ default: [] }) steps!: any[];
    @Prop() stylingMode!: string;
    @Prop() reset!: number;

    set updSteps(value: any) {
      this.$emit('update:steps', value);
    }
    selectedItems = [];
    defaultSteps :ItemStepperDto[] = []; 
    internalSteps:ItemStepperDto[] = [];

    openApiName: string = NttString.Empty;
    disabledUploader = false;

    mounted() {
      this.defaultSteps = JSON.parse(JSON.stringify(this.steps));
      this.internalSteps = this.steps;
    }

    @Watch('reset')
    public onRequestChanged(val: number, oldVal: number) {
      if(val !== oldVal) {
        this.internalSteps = this.defaultSteps;
      }
    }

    onClick(e: any) {
        this.$emit('btn-click', e);
    }

    valueChanged(value: string) {
      this.disabledUploader = value.length > 2;
    }

    removeTag(e: { element:{ outerText:string }, component: {_valuesToUpdate : Array<string>} }, itemStepper: ItemStepperDto ) {
      if(e.element.outerText.length > 0) {
        let difference = itemStepper.listSelected.filter(x => !e.component._valuesToUpdate.includes(x));
        itemStepper.listSelected = this.deleteItemList(itemStepper.listSelected as Array<string>, difference[0]);
        if(itemStepper?.data?.length > 0) {
          itemStepper.data = itemStepper.data.filter((item: any) => item.id !== difference[0]);
        }
        itemStepper = this.addPill(itemStepper, difference[0], itemStepper.multiple as boolean);
        this.internalSteps = this.internalSteps.map(item => { 
          if(item.id === itemStepper.id) {
            item = itemStepper;
          }
          return item;
        });
        this.updSteps = this.internalSteps;
        if(itemStepper.listSelected.length === 0) {
          itemStepper.state = false;
        }
        this.emitStateSteps();
      }
    }

    addPill(item: ItemStepperDto, itemSelected: string, isMultiple: boolean): ItemStepperDto {
      item.list?.push(itemSelected);
      item.list = [...new Set(item.list)];
      item.listSelected?.filter(el => el !== itemSelected);
      return item;
    }

    removePill(item: ItemStepperDto, itemSelected: string, isMultiple: boolean): ItemStepperDto {
      if(isMultiple) {
        item.listSelected?.push(itemSelected);
        item.listSelected = [...new Set(item.listSelected)];
        item.list?.filter(el => el !== itemSelected);
      } else {
        if(item.listSelected.length > 0) {
          item.list?.push(item.listSelected[0]);
          item.list = [...new Set(item.list)];
        }
        item.listSelected = [itemSelected];
      }
      return item;
    }


  readFile(file: any): Promise<string> {
      return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
              resolve((fileReader.result as string).split('data:application/json;base64,')[1]);
          };
          fileReader.onerror = () => {
              reject(fileReader.error);
          };
          fileReader.readAsDataURL(file);
      });
  }

  async uploadFile(event: any, item: ItemStepperDto): Promise<void> {
    try {
      const fileContent = await this.readFile(event.value[0]);
      const objSwagger =  JSON.parse(window.atob(fileContent as string));
      const files = event.value[0];
      const index = item.data.findIndex((item: any) => item.name === this.openApiName);
      if (index === -1) {
        let typeHttpClient = 'typescript-angular';
        const tecnologySelected = this.internalSteps[1].listSelected[0];
        if(tecnologySelected?.length > 0) {
          if(tecnologySelected !== 'Angular') {
            typeHttpClient= 'typescript-axios';
          }
        const ref = `${ this.openApiName }-${ files.name }`;
        item.data.push({ name: this.openApiName, swaggerContent: objSwagger, type: typeHttpClient });
        this.addItems(item, ref);
        } else {
          messageService.toast('You need select Tecnology', 'warning');
        }
      } else {
        messageService.toast('You need choose a different name', 'warning');
      }
      this.internalSteps = [...this.internalSteps]; // fix refresh file-uploader
      this.updSteps = this.internalSteps;
      this.openApiName = NttString.Empty;
      this.disabledUploader = false;

    } catch(error) {
        console.log(error);
        messageService.toast(error as string, 'error');
    }

  }

  addItems(itemStepper: ItemStepperDto, itemSelected: string, flag = true) {
    this.internalSteps = this.internalSteps.map((item: ItemStepperDto) => {
      if (item.id === itemStepper.id) {
        item = this.removePill(item, itemSelected, itemStepper.multiple as boolean);
        if (flag) itemStepper.list = this.deleteItemList(itemStepper.list as Array<string>, itemSelected);
        item.state = true;
        this.emitStateSteps();
      }
      return item;
    });
    this.updSteps = this.internalSteps;
  }

  deleteItemList(list: Array<string>, itemSelected: string): Array<string> {
    const index = list.findIndex((item: string) => item === itemSelected);
    if (index !== -1) {
      list.splice(index, 1);
    }
    return list;
  }

  emitStateSteps() {
    let flag = true;
    this.internalSteps.forEach(item => {
      if(!item.state && item.required) {
        flag = false;
      }
    });
    this.$emit('stateSteps', flag);
    this.$emit('dataSteps', this.internalSteps);
    this.updSteps = this.internalSteps;
  }

}