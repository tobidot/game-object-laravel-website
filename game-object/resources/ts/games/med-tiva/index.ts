import { GameServerApi } from "../utils/GameServerApi";

console.log("initialize Med-Tiva");

declare global {
    interface Window {
        api: GameServerApi;
    }
}

const api = new GameServerApi();
window.api = api;

