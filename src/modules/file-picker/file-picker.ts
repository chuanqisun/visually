import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class FilePicker {
    private filesPickedInternal = new Subject<File[]>();
    public filesPicked = this.filesPickedInternal.asObservable();

    constructor(private inputElement: HTMLInputElement) {
        this.attachEventHandler();
    }

    public reset() {
        this.inputElement.value = '';
    }

    private attachEventHandler() {
        this.inputElement.addEventListener('change', (event) => {
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