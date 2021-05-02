import { MedTivaServerApi } from "../api/MedTivaServerApi";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";
import { EventDelegator } from "./EventDelegator";
import { MedTivaMap } from "./MedTivaMap";
import { Settings } from "./Settings";

export class MedTivaApp {
    public api: MedTivaServerApi;
    public settings: Settings;
    public event_delegator: EventDelegator;
    public map: MedTivaMap;

    constructor() {
        this.api = window.api;
        this.event_delegator = new EventDelegator;
        const settings_element = get_element_by_selector_or_fail(document, '.settings');
        this.settings = new Settings(settings_element);
        this.map = new MedTivaMap();
        this.load();
    }

    public load() {
        this.map.refresh();
    }

}