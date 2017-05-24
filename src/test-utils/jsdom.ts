const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export function createDOM(): void {
    const dom = new JSDOM('<!DOCTYPE html>');
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
}

export function destoryDOM(): void {
    delete (global as any).document;
    delete (global as any).window;
}