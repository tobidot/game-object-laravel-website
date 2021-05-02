import { GameServerApi } from "../utils/GameServerApi";
import { MedTivaServerApi } from "./api/MedTivaServerApi";
import { MedTivaApp } from "./components/MedTivaApp";

console.log("initialize Med-Tiva");

declare global {
    interface Window {
        api: MedTivaServerApi;
        app: MedTivaApp;
    }
}

window.api = new MedTivaServerApi();
window.app = new MedTivaApp();
