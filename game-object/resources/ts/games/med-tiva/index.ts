import { GameServerApi } from "../utils/GameServerApi";
import { MedTivaServerApi } from "./api/MedTivaServerApi";

console.log("initialize Med-Tiva");

declare global {
    interface Window {
        api: MedTivaServerApi;
    }
}

const api = new MedTivaServerApi();
window.api = api;

