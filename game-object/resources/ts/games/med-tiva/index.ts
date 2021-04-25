import { GameServerApi } from "../utils/GameServerApi";
import { MedTivaServerApi } from "./api/MedTivaServerApi";
import { MedTivaMapView } from "./views/MedTivaMapView";

console.log("initialize Med-Tiva");

declare global {
    interface Window {
        api: MedTivaServerApi;
    }
}


(() => {

    const api = new MedTivaServerApi();
    window.api = api;


    console.log("Draw Map");
    const map_element = document.querySelector('#map');
    if (!(map_element instanceof HTMLElement)) throw new Error("element not found");
    const map = new MedTivaMapView(map_element);
    map.refresh().then(() => {
        map.redraw();
    });
})();