import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class JsonFileParser {
    private fileReader = new FileReader();
    private fileParsedInternal = new Subject<any>();
    public fileParsed = this.fileParsedInternal.asObservable();

    constructor() {
        this.fileReader.onload = (event) => {
            try {
                const result = JSON.parse(this.fileReader.result);
                this.fileParsedInternal.next(result);
            } catch (error) {
                this.fileParsedInternal.error('import palette failed. please start with the sample file and try again.');
            }
        }
    }

    public parseFile(file: File) {
        this.fileReader.readAsText(file);
    }
}