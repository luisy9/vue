
import DxDropDownButton from 'devextreme-vue/drop-down-button';
import { Options, Prop, Vue} from 'vue-property-decorator'

@Options({
    components: { DxDropDownButton }
  })

export default class NttDropDownButtonComponent extends Vue {
    @Prop() public text!: string;
    @Prop() public type!: string;
    @Prop() public stylingMode!: string;
    @Prop() public disabled!: boolean;

    onClick(e: any) {
        this.$emit('btn-click', e);
    }
}