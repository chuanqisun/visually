import { FilePicker } from './file-picker';
import { expect } from 'chai';
import { createDOM, destoryDOM } from '../../test-utils/jsdom';

import 'mocha';

describe('dom attachment', () => {
    beforeEach(() => {
        createDOM();
    });

    afterEach(()=> {
        destoryDOM();
    });

    it('should attach to dom input element', () => {
        const input = document.createElement('input') as HTMLInputElement;
        expect(() => new FilePicker(input)).not.to.throw();
    });
});