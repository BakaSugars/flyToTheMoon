import { Icon } from "./icon";
import { Link } from "../utils/link";
import { BaseManager } from "../utils/baseManager";

export class IconManager extends BaseManager {
    render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this._endLink.forEach((icon: Icon) => {
            icon.render(ctx, canvas);
        });
    }
}