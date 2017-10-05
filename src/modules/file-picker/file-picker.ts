import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class FilePicker {
    private filesPickedInternal = new Subject<File[]>();
    private eventListener: EventListener;
    public filesPicked = this.filesPickedInternal.asObservable();

    constructor(private inputElement: HTMLInputElement) {
        this.attachEventHandler();
    }

    public reset() {
        this.inputElement.value = '';
    }

    public destory() {
        this.inputElement.removeEventListener('change', this.eventListener);
    }

    private attachEventHandler() {
        this.inputElement.addEventListener('change', this.eventListener = (event) => {
            const fileList = (event.target as HTMLInputElement).files;
            if (fileList.length > 0) {
                let fileArray = [] as File[];
                for(let i = 0, l = fileList.length; i < l; i++) {
                    fileArray.push(fileList[i]);
                }
                this.filesPickedInternal.next(fileArray);
            }
        });
    }
}