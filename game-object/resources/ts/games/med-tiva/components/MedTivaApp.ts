import { MedTivaServerApi } from "../api/MedTivaServerApi";
import { EventSocket } from "../events/EventSocket";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";
import { HtmlEventDelegator } from "./HtmlEventDelegator";
import { MedTivaDetailsBox } from "./MedTivaDetailsBox";
import { MedTivaFieldTypeHelper } from "../consts/MedTivaFieldTypes";
import { MedTivaMap } from "./MedTivaMap";
import { Settings } from "./Settings";

export class MedTivaApp {
    public components: MedTivaAppComponents;
    public settings: Settings;
    public events: EventSocket = new EventSocket();

    constructor() {
        const settings_element = get_element_by_selector_or_fail(document, '.settings');
        this.settings = new Settings(settings_element);
        this.components = new MedTivaAppComponents(this);
        this.load();
    }

    public load() {
        this.components.map.refresh();
    }

}

class MedTivaAppComponents {
    public api: MedTivaServerApi;
    public event_delegator: HtmlEventDelegator;
    public map: MedTivaMap;
    public details_box: MedTivaDetailsBox;
    public field_type_helper: MedTivaFieldTypeHelper;

    public constructor(
        public app: MedTivaApp
    ) {
        this.api = window.api;
        this.event_delegator = new HtmlEventDelegator;
        this.map = new MedTivaMap(app);
        this.details_box = new MedTivaDetailsBox(app);
        this.field_type_helper = new MedTivaFieldTypeHelper(app);
    }

}