export default class Event {
    private _type: string;
    private _data: any;

    public get type(): string {
        return this._type;
    }

    public set type(type: string) {
        this._type = type;
    }

    public get data(): any {
        return this._data;
    }

    constructor(type: string, data: any = {}) {
        this._type = type;
        this._data = data;
    }
}
