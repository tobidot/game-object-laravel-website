import { GameServerApi } from "../utils/GameServerApi";
import { MedTivaServerApi } from "./api/MedTivaServerApi";
import { MedTivaApp } from "./components/MedTivaApp";
import { SelectFieldEvent } from "./events/SelectFieldEvent";

console.log("initialize Med-Tiva");

declare global {
    interface Window {
        api: MedTivaServerApi;
        app: MedTivaApp;
    }
}

window.api = new MedTivaServerApi();
window.app = new MedTivaApp();
window.app.events.dispatch(new SelectFieldEvent({
    x: 0,
    y: 0,
}));