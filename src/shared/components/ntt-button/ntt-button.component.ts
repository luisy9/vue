
import { DxButton } from 'devextreme-vue';
import { Options, Prop, Vue} from 'vue-property-decorator'

@Options({
    components: { DxButton }
  })

export default class NttButtonComponent extends Vue {
    @Prop() public text!: string;
    @Prop() public type!: string;
    @Prop() public stylingMode!: string;
    @Prop() public disabled!: boolean;

    onClick(e: any) {
        this.$emit('btn-click', e);
    }
}