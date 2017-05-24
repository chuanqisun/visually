import { Observable, Subject } from 'rxjs/Rx';

export class FilePicker {
    private filesPickedInternal = new Subject<FileList>();
    public filesPicked = this.filesPickedInternal.asObservable();

    constructor(private inputElement: HTMLInputElement) {
        this.attachEventHandler();
    }

    public reset() {
        this.inputElement.value = '';
    }

    private attachEventHandler() {
        this.inputElement.addEventListener('change', (event) => {
            const fileList = (event.target as any).files as FileList;
            if (fileList.length > 0) {
                this.filesPickedInternal.next(fileList);
            }
        });
    }
}