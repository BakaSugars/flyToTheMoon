export class AssetsManager {
    private _assetsMap: {[index: string]: any} = {};
    
    public loadImage(name: string, url: string) {
        return new Promise((res: any) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this._assetsMap[name] = img;
                res(img);
            };
        });
    }

    public getAsset(name: string) {
        return this._assetsMap[name];
    }
}