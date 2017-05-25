import { Color } from './color';
import { expect } from 'chai';
import 'mocha'

describe('color module', () => {
    describe('color creation', () => {
        it('should create from rgba array', () => {
            const color = new Color([1, 128, 255, 1]);
            expect(color.red).to.equal(1);
            expect(color.green).to.equal(128);
            expect(color.blue).to.equal(255);
            expect(color.alpha).to.equal(1);
        });

        it('should create from another color', () => {
            const otherColor = new Color([1, 128, 255, 1]);
            const color = new Color(otherColor);
            expect(color.red).to.equal(1);
            expect(color.green).to.equal(128);
            expect(color.blue).to.equal(255);
            expect(color.alpha).to.equal(1);
        });

        it('should create from rgba string', () => {
            const color = new Color('rgba(1, 128, 255, 1)');
            expect(color.red).to.equal(1);
            expect(color.green).to.equal(128);
            expect(color.blue).to.equal(255);
            expect(color.alpha).to.equal(1);
        });

        it('should create from rgba string without space', () => {
            const color = new Color('rgba(1,128,255,1)');
            expect(color.red).to.equal(1);
            expect(color.green).to.equal(128);
            expect(color.blue).to.equal(255);
            expect(color.alpha).to.equal(1);
        });

        it('should create from hex string', () => {
            const color = new Color('#00FFFF');
            expect(color.red).to.equal(0);
            expect(color.green).to.equal(255);
            expect(color.blue).to.equal(255);
            expect(color.alpha).to.equal(1);
        });

        it('should create from semi-transparent rgba string', () => {
            const color = new Color('rgba(1, 128, 255, 0.5)');
            expect(color.red).to.equal(1);
            expect(color.green).to.equal(128);
            expect(color.blue).to.equal(255);
            expect(color.alpha).to.equal(0.5);
        });

        it('should throw on rgb array', () => {
            expect(() => new Color([255, 255, 255] as any)).to.throw();
        });

        it('should throw on 3 digit hex string', () => {
            expect(() => new Color('#000')).to.throw();
        });

        it('should throw on empty string', () => {
            expect(() => new Color('')).to.throw();
        });

        it('should throw on rgba string without alpha channel', () => {
            expect(() => new Color('rgba(255, 255, 255)')).to.throw();
        });
    });

    describe('value retrieval', () => {
        it('should retrieve rgba string', () => {
            const color = new Color('rgba(0, 0, 255, 0.5)');
            expect(color.rgbaString).to.equal('rgba(0, 0, 255, 0.5)');
        });

        it('should retrieve hex string', () => {
            const color = new Color('rgba(0, 0, 255, 0.5)');
            expect(color.hexString).to.equal('#0000FF');
        });

        it('should retrieve hex string with 1 digit being 0', () => {
            const color = new Color('rgba(15, 15, 15, 1)');
            expect(color.hexString).to.equal('#0F0F0F');
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

    describe('contrast', () => {
        it('should contrast white on black', () => {
            const foreground = new Color('#FFFFFF');
            const background = new Color('#000000');
            const contrast = foreground.getContrastOnBackground(background);
            expect(contrast).to.equal(21);
        });

        it('should contrast black on white', () => {
            const foreground = new Color('#000000');
            const background = new Color('#FFFFFF');
            const contrast = foreground.getContrastOnBackground(background);
            expect(contrast).to.equal(21);
        });

        it('should contrast white on white', () => {
            const foreground = new Color('#FFFFFF');
            const background = new Color('#FFFFFF');
            const contrast = foreground.getContrastOnBackground(background);
            expect(contrast).to.equal(1);
        });

        it('should contrast black on black', () => {
            const foreground = new Color('#000000');
            const background = new Color('#000000');
            const contrast = foreground.getContrastOnBackground(background);
            expect(contrast).to.equal(1);
        });

        it('should throw on semi-transparent background', () => {
            const foreground = new Color('#000000');
            const background = new Color('rgba(0, 0, 255, 0.5)');
            expect(() => foreground.getContrastOnBackground(background)).to.throw();
        });

        it('should throw on semi-transparent foreground', () => {
            const foreground = new Color('rgba(0, 0, 255, 0.5)');
            const background = new Color('#000000');
            expect(() => foreground.getContrastOnBackground(background)).to.throw();
        });
    });
});