import { MedTivaField } from "../api/MedTivaApiStructs";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";

export class MedTivaMap {
    public listeners: MedTivaMapListeners;
    public properties: MedTivaMapProperties;
    public logic: MedTivaMapLogic;
    public elements: MedTivaMapElements;
    public view: MedTivaMapView;

    constructor() {
        this.elements = new MedTivaMapElements(this);
        this.properties = new MedTivaMapProperties(this);
        this.logic = new MedTivaMapLogic(this);
        this.view = new MedTivaMapView(this);
        this.listeners = new MedTivaMapListeners(this);
    }

    public async refresh(): Promise<this> {
        return this.logic.refresh().then(() => {
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
        this.parent.elements.map.addEventListener('click', this.on_map_select_func);
    }

    protected on_map_select_func = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (!target.classList.contains('field')) return;
        const field_input_x = Number.parseInt(target.getAttribute('data-x') ?? "0");
        const field_input_y = Number.parseInt(target.getAttribute('data-y') ?? "0");
        this.parent.properties.center_x += field_input_x - 2;
        this.parent.properties.center_y += field_input_y - 2;
        this.parent.refresh();
    }

    protected on_map_control_change = (event: Event) => {
        const form_data = new FormData(this.parent.elements.control_form);
        this.parent.properties.center_x = Number.parseInt(this.parent.elements.control_field_x.value ?? "0");
        this.parent.properties.center_y = Number.parseInt(this.parent.elements.control_field_y.value ?? "0");
        this.parent.refresh();
    }
}

class MedTivaMapLogic {

    constructor(
        public parent: MedTivaMap
    ) {
    }

    public async refresh(): Promise<this> {
        const props = this.parent.properties;
        if (props.is_refreshing) return Promise.reject();
        const start_x = props.center_x - Math.floor(props.width / 2);
        const start_y = props.center_y - Math.floor(props.height / 2);
        const end_x = props.center_x + Math.ceil(props.width / 2);
        const end_y = props.center_y + Math.ceil(props.height / 2);
        const fields_to_update: Array<{ x: number, y: number }> = [];
        this.parent.elements.control_field_x.value = props.center_x.toString();
        this.parent.elements.control_field_y.value = props.center_y.toString();

        for (let y = start_y; y < end_y; ++y) {
            for (let x = start_x; x < end_x; ++x) {
                fields_to_update.push({ x, y });
            }
        }
        return window.api.get_fields(fields_to_update)
            .then(fields => {
                fields.forEach((field: MedTivaField) => {
                    const field_key = [field.x, field.y].join(',');
                    props.fields.set(field_key, field);
                });
                return this;
            });
    }

    public get_field_position_for_input_position(x: number, y: number): [number, number] {
        return [
            x - 2 + this.parent.properties.center_x,
            y - 2 + this.parent.properties.center_y,
        ]
    }
}

class MedTivaMapProperties {
    public center_x: number = 0;
    public center_y: number = 0;
    public width: number = 5;
    public height: number = 5;
    public fields: Map<string, MedTivaField> = new Map();
    public is_refreshing: boolean = false;

    constructor(
        public parent: MedTivaMap
    ) {
    }

}

class MedTivaMapElements {
    public map: HTMLElement;
    public fields: Map<string, HTMLElement> = new Map();
    public control_form: HTMLFormElement;
    public control_field_x: HTMLInputElement;
    public control_field_y: HTMLInputElement;

    constructor(
        public parent: MedTivaMap
    ) {
        this.map = get_element_by_selector_or_fail(document, '#map');
        this.control_form = get_element_by_selector_or_fail(document, '#map-control', HTMLFormElement);
        this.control_field_x = get_element_by_selector_or_fail(document, '#map-control__center-x', HTMLInputElement);
        this.control_field_y = get_element_by_selector_or_fail(document, '#map-control__center-y', HTMLInputElement);
    }
}

class MedTivaMapView {


    public constructor(
        public parent: MedTivaMap
    ) {
        const field_elements = this.parent.elements.fields;
        const map_element = this.parent.elements.map;
        map_element.className = "map";
        for (let y = 0; y < 5; ++y) {
            for (let x = 0; x < 5; ++x) {
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
        for (let element of this.parent.elements.fields.values()) {
            const field_input_x = Number.parseInt(element.getAttribute('data-x') ?? "0");
            const field_input_y = Number.parseInt(element.getAttribute('data-y') ?? "0");
            const field_position = this.parent.logic.get_field_position_for_input_position(field_input_x, field_input_y);
            const field_key = field_position.join(',');
            let field = this.parent.properties.fields.get(field_key);
            this.redraw_field(element, field ?? false);
        }
    }

    public redraw_field(field_el: HTMLElement, field: MedTivaField | false) {
        if (field === false) {
            field_el.className = "field field-type--plane";
            return;
        }
        const field_types = ["plane", "cave", "city"];
        field_el.className = "field field-type--" + field_types[field.base_type];
    }
}