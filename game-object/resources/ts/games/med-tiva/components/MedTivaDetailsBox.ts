import { MedTivaField } from "../api/MedTivaApiStructs";
import { SelectFieldEvent } from "../events/SelectFieldEvent";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";
import { MedTivaApp } from "./MedTivaApp";

export class MedTivaDetailsBox {
    public logic: MedTivaDetailsBoxLogic;
    public props: MedTivaDetailsBoxProperties;
    public listeners: MedTivaDetailsBoxListeners;
    public elements: MedTivaDetailsBoxElements;

    public constructor(
        public app: MedTivaApp
    ) {
        this.elements = new MedTivaDetailsBoxElements(this);
        this.logic = new MedTivaDetailsBoxLogic(this);
        this.props = new MedTivaDetailsBoxProperties(this);
        this.listeners = new MedTivaDetailsBoxListeners(this);
    }
}

class MedTivaDetailsBoxElements {
    public wrapper: HTMLElement;
    public image_container: HTMLElement;
    public image: HTMLImageElement;
    public data: HTMLElement;

    public constructor(
        public parent: MedTivaDetailsBox
    ) {
        this.wrapper = get_element_by_selector_or_fail(document, '#app .info');
        this.image_container = get_element_by_selector_or_fail(this.wrapper, '.info__image');
        this.image = get_element_by_selector_or_fail(this.wrapper, '.info__image img', HTMLImageElement);
        this.data = get_element_by_selector_or_fail(this.wrapper, '.info__data');
    }
}

class MedTivaDetailsBoxLogic {

    public constructor(
        public parent: MedTivaDetailsBox
    ) {

    }
}

class MedTivaDetailsBoxProperties {

    public constructor(
        public parent: MedTivaDetailsBox
    ) {

    }
}

class MedTivaDetailsBoxListeners {

    public constructor(
        public parent: MedTivaDetailsBox
    ) {
        this.parent.app.events.listen<SelectFieldEvent>("select-field", this.on_field_select_func);
    }

    protected on_field_select_func = (event: SelectFieldEvent) => {
        this.parent.app.components.map.at_async(event.field).then(() => {
            const field = this.parent.app.components.map.at(event.field);
            if (!field) {
                throw new Error("Unable to view Field");
            }
            const field_type = this.parent.app.components.field_type_helper.ALL[field.base_type];
            this.parent.elements.image.src = field_type.image_url;
        });
    }
}