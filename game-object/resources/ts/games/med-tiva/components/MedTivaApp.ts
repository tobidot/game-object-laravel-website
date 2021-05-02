import { MedTivaServerApi } from "../api/MedTivaServerApi";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";
import { MedTivaMapView } from "../views/MedTivaMapView";
import { EventDelegator } from "./EventDelegator";
import { Settings } from "./Settings";

export class MedTivaApp {
    public api: MedTivaServerApi;
    public settings: Settings;
    public event_delegator: EventDelegator;

    constructor() {
        this.api = window.api;
        this.event_delegator = new EventDelegator;
        const settings_element = get_element_by_selector_or_fail(document, '.settings');
        this.settings = new Settings(settings_element);

        this.load();
    }

    public load() {
        console.log("Draw Map");
        const map_element = document.querySelector('#map');
        if (!(map_element instanceof HTMLElement)) throw new Error("element not found");
        const map = new MedTivaMapView(map_element);
        map.refresh().then(() => {
            map.redraw();
        });
    }

}