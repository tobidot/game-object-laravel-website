import { MedTivaField } from "../api/MedTivaApiStructs";
import { SelectFieldEvent } from "../events/SelectFieldEvent";
import { MedTivaFieldPosition } from "../structs/MedTivaFieldExtensions";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";
import { MedTivaApp } from "./MedTivaApp";

export class MedTivaMap {
    public listeners: MedTivaMapListeners;
    public properties: MedTivaMapProperties;
    public logic: MedTivaMapLogic;
    public elements: MedTivaMapElements;
    public view: MedTivaMapView;

    constructor(
        public app: MedTivaApp
    ) {
        this.elements = new MedTivaMapElements(this);
        this.properties = new MedTivaMapProperties(this);
        this.logic = new MedTivaMapLogic(this);
        this.view = new MedTivaMapView(this);
        this.listeners = new MedTivaMapListeners(this);
    }

    public at(position: MedTivaFieldPosition): MedTivaField | undefined {
        return this.properties.fields.get(this.logic.get_field_key(position));
    }

    public async at_async(position: MedTivaFieldPosition): Promise<Array<MedTivaField>> {
        const field = this.properties.fields.get(this.logic.get_field_key(position));
        return new Promise<Array<MedTivaField>>((resolve, reject) => {
            if (field) return resolve([field]);
            return resolve(this.logic.request_fields([position]));
        });
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
        this.parent.elements.control_form.addEventListener('change', this.on_map_control_change_func);
        this.parent.elements.map.addEventListener('click', this.on_map_click_func);
        this.parent.app.events.listen<SelectFieldEvent>("select-field", this.on_field_select_func);
    }

    protected on_field_select_func = (event: SelectFieldEvent) => {
        this.parent.properties.center_x = event.field.x;
        this.parent.properties.center_y = event.field.y;
        this.parent.elements.control_field_x.value = event.field.x.toString();
        this.parent.elements.control_field_y.value = event.field.y.toString();
        this.parent.refresh();
    }

    protected on_map_click_func = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (!target.classList.contains('field')) return;
        if (target.classList.contains('field-type--loading')) return;
        const field_input_x = Number.parseInt(target.getAttribute('data-x') ?? "0");
        const field_input_y = Number.parseInt(target.getAttribute('data-y') ?? "0");
        const field_position = this.parent.logic.get_field_position_for_input_position(field_input_x, field_input_y);
        const app_event = new SelectFieldEvent(field_position);
        this.parent.app.events.dispatch(app_event);
    }

    protected on_map_control_change_func = (event: Event) => {
        const form_data = new FormData(this.parent.elements.control_form);
        const x = Number.parseInt(this.parent.elements.control_field_x.value ?? "0");
        const y = Number.parseInt(this.parent.elements.control_field_y.value ?? "0");
        const field_position = { x, y };
        const app_event = new SelectFieldEvent(field_position);
        this.parent.app.events.dispatch(app_event);
    }
}

class MedTivaMapLogic {
    protected requested_fields: Set<MedTivaFieldPosition> = new Set();
    protected requested_field_resolvers: Array<(value: MedTivaField[]) => void> = [];
    protected requested_field_handle: number | null = null;

    constructor(
        public parent: MedTivaMap
    ) {
    }

    public async refresh(): Promise<Array<MedTivaField>> {
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
        return this.request_fields(fields_to_update);
    }

    public fetch_requested_fields_func = () => {
        window.api.get_fields([...this.requested_fields.values()])
            .then((fields) => {
                fields.forEach((field: MedTivaField) => {
                    const field_key = this.get_field_key(field);
                    this.parent.properties.fields.set(field_key, field);
                });
                this.requested_field_resolvers.forEach((resolver) => {
                    resolver(fields as Array<MedTivaField>);
                });
                this.requested_fields.clear();
                this.requested_field_resolvers = [];
                this.requested_field_handle = null;
            }).catch(() => {
                console.log("failed to load fields");
            });
        this.requested_field_handle = null;
    }

    public initiate_request() {
        if (this.requested_field_handle !== null) return;
        this.requested_field_handle = window.setTimeout(this.fetch_requested_fields_func, 33);
    }

    public async request_fields(field_positions: Array<MedTivaFieldPosition>): Promise<Array<MedTivaField>> {
        return new Promise<Array<MedTivaField>>((resolve, reject) => {
            field_positions.forEach((field_position) => {
                this.requested_fields.add(field_position);
            });
            this.requested_field_resolvers.push(resolve);
            this.initiate_request();
        }).then((fields: Array<MedTivaField>) => {
            return fields;
        });
    }

    public get_field_key(field: { x: number, y: number }): string {
        return [field.x, field.y].join(',');
    }

    public get_field_position_for_input_position(x: number, y: number): MedTivaFieldPosition {
        return {
            x: x - this.parent.properties.center_offset_x + this.parent.properties.center_x,
            y: y - this.parent.properties.center_offset_y + this.parent.properties.center_y,
        };
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

    public get center_offset_x(): number {
        return Math.floor(this.width / 2);
    }

    public get center_offset_y(): number {
        return Math.floor(this.height / 2);
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
                field_el.className = "field field-type--loading";
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
            const field = this.parent.at(field_position);
            this.redraw_field(element, field ?? false);
        }
    }

    public redraw_field(field_el: HTMLElement, field: MedTivaField | false) {
        if (field === false) {
            field_el.className = "field field-type--loading";
            return;
        }
        const field_types = ["plane", "cave", "city"];
        field_el.className = "field field-type--" + field_types[field.base_type];
    }
}