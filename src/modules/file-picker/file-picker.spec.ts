import { FilePicker } from './file-picker';
import { expect } from 'chai';
import { createDOM, destoryDOM } from '../../test-utils/jsdom';

import 'mocha';

function getMockFileList(): any[] {
    return [
        { name: 'filename1'},
        { name: 'filename2'},
        { name: 'filename3'},
    ];
}

describe('file-picker module', () => {
    beforeEach(() => {
        createDOM();
    });

    afterEach(()=> {
        destoryDOM();
    });

    describe('dom attachment', () => {
        it('should attach to dom input element', () => {
            const input = document.createElement('input') as HTMLInputElement;
            expect(() => new FilePicker(input)).not.to.throw();
        });
    });

    describe('event emitting', () => {
        it('should emit files array on change', (done) => {
            const changeEvent = document.createEvent('HTMLEvents');
            changeEvent.initEvent('change', false, false);
            const input = document.createElement('input') as HTMLInputElement;
            const filePicker = new FilePicker(input);
            Object.defineProperty(changeEvent, 'target', {value: { files: getMockFileList() }, enumerable: true});

            filePicker.filesPicked.subscribe(fileList => {
                expect(fileList.length).to.equal(3);
                expect(fileList[0].name).to.equal('filename1');
                expect(fileList[1].name).to.equal('filename2');
                expect(fileList[2].name).to.equal('filename3');
                done();
            });

            input.dispatchEvent(changeEvent);
        });
    });
});