import { MedTivaField } from "../api/MedTivaApiStructs";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";

export class MedTivaMap {
    public listeners: MedTivaMapListeners;
    public properties: MedTivaMapProperties;
    public elements: MedTivaMapElements;
    public view: MedTivaMapView;

    constructor() {
        this.properties = new MedTivaMapProperties(this);
        this.elements = new MedTivaMapElements(this);
        this.view = new MedTivaMapView(this);
        this.listeners = new MedTivaMapListeners(this);
    }

    public async refresh(): Promise<this> {
        return this.properties.refresh().then(() => {
            this.view.redraw();
            return this;
        });
    }

}

class MedTivaMapListeners {
    constructor(
        public parent: MedTivaMap
    ) {
        this.parent.elements.control_form.addEventListener('change', this.on_map_control_change);
    }

    protected on_map_control_change = (event: Event) => {
        const form_data = new FormData(this.parent.elements.control_form);
        this.parent.properties.center_x = Number.parseInt(form_data.get('center-x')?.toString() ?? "0");
        this.parent.properties.center_y = Number.parseInt(form_data.get('center-y')?.toString() ?? "0");
        this.parent.refresh();
    }
}

class MedTivaMapProperties {
    public center_x: number = 0;
    public center_y: number = 0;
    public width: number = 5;
    public height: number = 5;
    public fields: Map<string, MedTivaField> = new Map();

    constructor(
        public parent: MedTivaMap
    ) {
    }

    public async refresh(): Promise<this> {
        const start_x = this.center_x - Math.floor(this.width / 2);
        const start_y = this.center_y - Math.floor(this.height / 2);
        const end_x = this.center_x + Math.ceil(this.width / 2);
        const end_y = this.center_y + Math.ceil(this.height / 2);
        const fields_to_update: Array<{ x: number, y: number }> = [];
        for (let y = start_y; y < end_y; ++y) {
            for (let x = start_x; x < end_x; ++x) {
                fields_to_update.push({ x, y });
            }
        }
        return window.api.get_fields(fields_to_update)
            .then(fields => {
                fields.forEach((field: MedTivaField) => {
                    this.fields.set([field.x, field.y].join(','), field);
                });
                return this;
            });
    }
}

class MedTivaMapElements {
    public map: HTMLElement;
    public fields: Map<string, HTMLElement> = new Map();
    public control_form: HTMLFormElement;

    constructor(
        public parent: MedTivaMap
    ) {
        this.map = get_element_by_selector_or_fail(document, '#map');
        this.control_form = get_element_by_selector_or_fail(document, '#map-control', HTMLFormElement);
    }
}

class MedTivaMapView {


    public constructor(
        public parent: MedTivaMap
    ) {
        const field_elements = this.parent.elements.fields;
        const map_element = this.parent.elements.map;
        map_element.className = "map";
        for (let x = 0; x < 5; ++x) {
            for (let y = 0; y < 5; ++y) {
                const field_el = document.createElement('div');
                field_el.className = "field field-type--plane";
                field_el.setAttribute('data-x', x.toString());
                field_el.setAttribute('data-y', y.toString());
                field_el.setAttribute('data-key', [x, y].join(','));
                field_elements.set([x, y].join(','), field_el);
                map_element.append(field_el);
            }
        }
    }

    public redraw() {
        const field_types = ["plane", "cave", "city"];
        for (let element of this.parent.elements.fields.values()) {
            let field = this.parent.properties.fields.get(element.getAttribute('data-key')!);
            element.className = "field field-type--" + field_types[field?.base_type ?? 0];
        }
    }
}