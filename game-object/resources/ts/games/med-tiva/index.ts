import { GameServerApi } from "../utils/GameServerApi";
import { MedTivaServerApi } from "./api/MedTivaServerApi";
import { Settings } from "./components/Settings";
import { get_element_by_selector_or_fail } from "./utils/dom-helpers";
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

    const settings_element = get_element_by_selector_or_fail(document, '.settings');
    const settings = new Settings(settings_element);

    console.log("Draw Map");
    const map_element = document.querySelector('#map');
    if (!(map_element instanceof HTMLElement)) throw new Error("element not found");
    const map = new MedTivaMapView(map_element);
    map.refresh().then(() => {
        map.redraw();
    });
})();