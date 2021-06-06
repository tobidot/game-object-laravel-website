import { MedTivaServerApi } from "../api/MedTivaServerApi";
import { EventSocket } from "../events/EventSocket";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";
import { HtmlEventDelegator } from "./HtmlEventDelegator";
import { MedTivaDetailsBox } from "./MedTivaDetailsBox";
import { MedTivaFieldTypeHelper } from "../consts/MedTivaFieldTypes";
import { MedTivaMap } from "./MedTivaMap";
import { Settings } from "./Settings";
import { MedTivaMe } from "../api/MedTivaApiStructs";
import { MedTivaMenu } from "./MedTivaMenu";

export class MedTivaApp {
    public components: MedTivaAppComponents;
    public settings: Settings;
    public events: EventSocket = new EventSocket();
    public globals: MedTivaAppGlobals;

    private constructor(globals: MedTivaAppGlobals) {
        const settings_element = get_element_by_selector_or_fail(document, '.settings');
        this.settings = new Settings(settings_element);
        this.components = new MedTivaAppComponents(this);
        this.globals = globals;
        this.load().catch(() => {
            console.error('failed to load game data');
        });
    }

    public async load() {
        await this.components.map.refresh();
    }

    public static load(): Promise<MedTivaApp> {
        return window.api.get_me().then((me: MedTivaMe) => {
            const globals: MedTivaAppGlobals = {
                player: me
            };
            return new MedTivaApp(globals);
        });
    }
}

class MedTivaAppComponents {
    public api: MedTivaServerApi;
    public event_delegator: HtmlEventDelegator;
    public map: MedTivaMap;
    public details_box: MedTivaDetailsBox;
    public field_type_helper: MedTivaFieldTypeHelper;
    public med_tiva_menu: MedTivaMenu;

    public constructor(
        public app: MedTivaApp
    ) {
        this.api = window.api;
        this.event_delegator = new HtmlEventDelegator;
        this.map = new MedTivaMap(app);
        this.details_box = new MedTivaDetailsBox(app);
        this.field_type_helper = new MedTivaFieldTypeHelper(app);
        this.med_tiva_menu = new MedTivaMenu(app);
    }

}

interface MedTivaAppGlobals {
    player: MedTivaMe;

}