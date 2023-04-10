import * as $ from 'lodash';
import { NttString } from "../utils/ntt-string";

export class BaseDto {

    public id: any = null;
    private originalJson: string = NttString.Empty;

    constructor(src?: any, enableTrackChanges: boolean = false) {
        this.copy(src);

        if (enableTrackChanges) {
            this.resetTrackChanges();
        }
    }

    public copy(src?: any) {
        if (src) {
            $.extend(this, src);
        }
    }

    public isNewItem(): boolean {
        return this.id === null ? true : false;
    }

    public isChanged(): boolean {
        if (this.originalJson != null) {
            const currentJson = JSON.stringify(this.omitKeys(this, ['originalJson']));
            return currentJson !== this.originalJson;
        } else {
            return false;
        }
    }

    public fromJson(data: string) {
        if (data) {
            const object = JSON.parse(data);
            $.extend(this, object);
        }
    }

    resetOriginValue() {
        this.fromJson(this.originalJson);
    }

    public toJson(omitProperties: string[] = [], resetTrackChanges: boolean = true) {
        omitProperties.push('originalJson');
        if (omitProperties.indexOf('Id') === -1 && (this.id === null || this.id === undefined)) {
            omitProperties.push('Id');
        }
        const jsonData = JSON.stringify(this.omitKeys(this, omitProperties));

        if (resetTrackChanges) {
            this.originalJson = jsonData;
        }

        return jsonData;
    }

    protected resetTrackChanges() {
        this.toJson();
    }

    private omitKeys(obj: any, keys: any) {
        const dup: any = {};
        for (const key in obj) {
            if (keys.indexOf(key) === -1) {
                dup[key] = obj[key];
            }
        }
        return dup;
    }
}
