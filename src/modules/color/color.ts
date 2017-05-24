export class Color {
    /**
     * underlying representation
     * r,g,b: 0-255
     * a: 0-1
     */
    private rgba: number[] = [undefined, undefined, undefined, undefined];

    constructor(value: string) {
        this.setColorFromValue(value);
    }

    public get red(): number {
        return this.rgba[0];
    }

    public get green(): number {
        return this.rgba[1];
    }

    public get blue(): number {
        return this.rgba[2];
    }

    public get alpha(): number {
        return this.rgba[3];
    }

    public get rgbaString(): string {
        return `rgba(${this.rgba[0]}, ${this.rgba[1]}, ${this.rgba[2]}, ${this.rgba[3]})`;
    }

    public get hexString(): string {
        return `#${this.convert256toHex(this.rgba[0])}${this.convert256toHex(this.rgba[1])}${this.convert256toHex(this.rgba[2])}`;
    }

    public get luminance(): number {
        return .2126 * this.getLuminanceComponent(this.rgba[0]) + .7152 * this.getLuminanceComponent(this.rgba[1]) + 0.0722 * this.getLuminanceComponent(this.rgba[2]);
    }

    public getContrastOnBackground(color: Color): number {
        // TODO support transparent foreground
        if (this.alpha !== 1 || color.alpha !== 1) {
            throw 'transparent color contrast not supported yet'
        }

        // https://www.w3.org/TR/WCAG20/#contrast-ratiodef
        const contrast = this.luminance > color.luminance ? (this.luminance + 0.05)/(color.luminance + 0.05) : (color.luminance + 0.05)/(this.luminance + 0.05);
        return this.roundToPrecision(contrast, 1);
    }

    private setColorFromValue(value: string) {
        const type = inferValueType(value);
        switch (type) {
            case 'hex':
                this.setColorFromHex(value);
                break;
            case 'rgba':
                this.setColorFromRbga(value);
                break;
            default:
                const exhaustiveCheck: never = type;
        }
    }

    private setColorFromHex(hexString: string) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        if (result && result.length === 4) {
            this.rgba[0] = parseInt(result[1], 16);
            this.rgba[1] = parseInt(result[2], 16);
            this.rgba[2] = parseInt(result[3], 16);
            this.rgba[3] = 1;
        } else {
            throw 'invalid hex value';
        }
    }

    private setColorFromRbga(rbgaString: string) {
        let result = /^rgba\(([\d]+), *([\d]+), *([\d]+), *(\d*\.?\d*)\)$/.exec(rbgaString);
        if (result && result.length === 5) {
            this.rgba[0] = parseInt(result[1]);
            this.rgba[1] = parseInt(result[2]);
            this.rgba[2] = parseInt(result[3]);
            this.rgba[3] = parseFloat(result[4]);
        } else {
            throw 'invalid rgba value' ;
        }
    }

    private convert256toHex(value: number): string {
        return ("0" + value.toString(16)).slice(-2).toUpperCase();
    }

    /**
     * get R, G, or B from R_8bit, G_8bit, or B_8bit
     * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
     */
    private getLuminanceComponent(rawValue: number): number {
        let result = rawValue / 255; // 8bit -> sRGB
        return result < .03928 ? result / 12.92 : Math.pow((result + .055) / 1.055, 2.4);
    }

    private roundToPrecision(value: number, precision: number): number {
		precision = +precision || 0;

		var multiplier = Math.pow(10, precision);

		return Math.round(value * multiplier) / multiplier;
    }
}

export type ValueType = 'hex' | 'rgba';
export function inferValueType(value: string): ValueType {
    if (!value.length) {
        throw 'invalid color';
    } else if (value[0] === '#') {
        return 'hex';
    } else if (value.length > 4 && value.substr(0, 4) === 'rgba') {
        return 'rgba';
    } else {
        throw 'unsupported color';
    }
}