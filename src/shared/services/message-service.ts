import { alert, confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';

export class MessageService {

    public position = 'bottom center';
    public displayTime = 5000;

    public toast(message: string, type: string = 'success', position: string = this.position) {

        const object = {
            message: message,
            type: type,
            displayTime: this.displayTime,
            position: position
        };

        notify(object);
    }

    public toastHTML(message: string, type: string) {
        const template = `<div data-options="dxTemplate: { name:'myContent' }">` + message + `</div>`;

        const object = {
            contentTemplate: template,
            type: type,
            displayTime: this.displayTime,
            position: this.position
        };

        notify(object);
    }

    public confirm(message: string, title = 'Pregunta') {
        return confirm(message, title);
    }

    public alert(message: string, title = 'Información') {
        return alert(message, title);
    }

    public showLoading(customClass: any = '') {

    }

    public hideLoading() {
    
    }
}

export const messageService = new MessageService();