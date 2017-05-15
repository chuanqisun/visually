import { Color } from './color';
import { expect } from 'chai';
import 'mocha'

describe('color creation', () => {
    it('should create from rgba color', () => {
        const color = new Color('rgba(255, 255, 255, 1)');
        expect(color.rgba).to.equal('rgba(255, 255, 255, 1)');
    });

    it('should create from rgba color without space', () => {
        const color = new Color('rgba(255,255,255,1)');
        expect(color.rgba).to.equal('rgba(255, 255, 255, 1)');
    });

    it('should create from hex color', () => {
        const color = new Color('#FFFFFF');
        expect(color.rgba).to.equal('rgba(255, 255, 255, 1)');
    });

    it('should throw on 3 digit hex value', () => {
        expect(() => new Color('#000')).to.throw();
    });

    it('should throw on empty value', () => {
        expect(() => new Color('')).to.throw();
    });

    it('should throw on rgba color without alpha channel', () => {
        expect(() => new Color('rgba(255, 255, 255)')).to.throw();
    });
});

describe('value retrieval', () => {
    it('should retrieve rgba color', () => {
        const color = new Color('rgba(0, 0, 255, 0.5)');
        expect(color.rgba).to.equal('rgba(0, 0, 255, 0.5)');
    });

    it('should retrieve hex color', () => {
        const color = new Color('rgba(0, 0, 255, 0.5)');
        expect(color.hex).to.equal('#0000FF');
    });

    it('should retrieve hex color with 1 digit being 0', () => {
        const color = new Color('rgba(15, 15, 15, 1)');
        expect(color.hex).to.equal('#0F0F0F');
    });

    it('should retrieve luminance 1 from white', () => {
        const color = new Color('#FFFFFF');
        expect(color.luminance).to.equal(1);
    });

    it('should retrieve luminance 0 from black', () => {
        const color = new Color('#000000');
        expect(color.luminance).to.equal(0);
    });

    it('should retrieve luminance 0.216 from 50% grey', () => {
        const color = new Color('rgba(128, 128, 128, 1)');
        expect(Math.round(color.luminance * 1000)).to.equal(216);
    });
});