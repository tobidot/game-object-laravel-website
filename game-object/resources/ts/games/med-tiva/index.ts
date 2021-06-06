import { GameServerApi } from "../utils/GameServerApi";
import { MedTivaServerApi } from "./api/MedTivaServerApi";
import { MedTivaApp } from "./components/MedTivaApp";
import { MedTivaMap } from "./components/MedTivaMap";
import { SelectFieldEvent } from "./events/SelectFieldEvent";

console.log("initialize Med-Tiva");

declare global {
    interface Window {
        api: MedTivaServerApi;
        app: MedTivaApp;
    }
}

window.api = new MedTivaServerApi();
MedTivaApp.load().then((app: MedTivaApp) => {
    window.app = app;
    window.app.events.dispatch(new SelectFieldEvent({
        x: 0,
        y: 0,
    }));
});