
import { messageService } from './message-service';

export class LoadingService {

    protected loadingCount: number;

    constructor() {
        this.loadingCount = 0;
    }

    public enableLoading() {
        if (!this.isLoading()) {
            messageService.showLoading();
        }
        this.loadingCount++;
    }

    public disableLoading() {
        this.loadingCount--;
        if (!this.isLoading()) {
            messageService.hideLoading();
        }
    }

    public isLoading(): boolean {
        return this.loadingCount > 0;
    }

}

export const loadingService = new LoadingService();