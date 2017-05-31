import { JsonFileParser } from './json-file-parser';
import { expect } from 'chai';

import 'mocha';

function getMockFileList(): any[] {
    return [
        { name: 'filename1'},
        { name: 'filename2'},
        { name: 'filename3'},
    ];
}

describe('json-file-parser module', () => {
    describe('event emitting', () => {
        it('should emit object after success parsing', (done) => {
            const jsonFileParser = new JsonFileParser();
            const mockFile = new File([`
            {
                "key1": "value1",
                "key2": {
                    "key21": "value21",
                    "key22": "value22"
                }    
            }`], 'mock-data.json');

            jsonFileParser.fileParsed.subscribe(result => {
                expect(result.key1).to.equal('value1');
                expect(result.key2.key21).to.equal('value21');
                done();
            });

            jsonFileParser.parseFile(mockFile);
        });

        it('should throw when file is invalid json', (done) => {
            const jsonFileParser = new JsonFileParser();
            const mockFile = new File([`{ key1withoutvalue }`], 'mock-data.json');

            jsonFileParser.fileParsed.subscribe(result => {}, (error) => {
                done();
            });

            jsonFileParser.parseFile(mockFile);
        });
    });
});