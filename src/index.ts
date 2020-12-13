import { Scene } from "./game/scene";
import { MoveControl } from "./ui/moveControl";
import { ControlManager } from "./ui/controlManager";
import { UiManager } from "./ui/uiManager";
import { EventName } from "./utils/constant";


async function main() {
    const container = document.getElementById('container') as HTMLDivElement;
    const scene = new Scene(container);
    await scene.init();
    const uiManager = new UiManager(container);
    uiManager.controlManager.connect(scene.rocket);
    scene.on(EventName.GAME_END, (e) => {
        uiManager.endGame(e.data);
    });
    window.scene = scene;
}

main();
