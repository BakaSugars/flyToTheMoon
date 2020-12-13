export class Mask {
    private _element: HTMLElement
    constructor() {
        this._element = document.getElementById('mask');
    }

    public show() {
        this._element.style.visibility = 'visible';
    }

    public hide() {
        this._element.style.visibility = 'hidden';
    }

    public get element() {
        return this._element;
    }
}