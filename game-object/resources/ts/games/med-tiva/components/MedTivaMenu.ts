import { is_city, is_not_hidden, MedTivaField } from "../api/MedTivaApiStructs";
import { MedTivaEvent } from "../events/MedTivaEvent";
import { SelectFieldEvent } from "../events/SelectFieldEvent";
import { get_element_by_selector_or_fail } from "../utils/dom-helpers";
import { MedTivaApp } from "./MedTivaApp";

export class MedTivaMenu {
    public elements: MedTivaMenuElements;
    public properties: MedTivaMenuProperties;
    public logic: MedTivaMenuLogic;
    public listeners: MedTivaMenuListeners;

    constructor(
        public app: MedTivaApp
    ) {
        this.elements = new MedTivaMenuElements(this);
        this.properties = new MedTivaMenuProperties(this);
        this.logic = new MedTivaMenuLogic(this);
        this.listeners = new MedTivaMenuListeners(this);
    }
}

class MedTivaMenuElements {
    public recruit_units: HTMLElement;
    public recruit_units_action: HTMLButtonElement;
    public action_message: HTMLElement;

    constructor(
        public parent: MedTivaMenu
    ) {
        this.recruit_units = get_element_by_selector_or_fail(document, '#recruit-units');
        this.recruit_units_action = get_element_by_selector_or_fail(this.recruit_units, '.submit', HTMLButtonElement);
        this.action_message = get_element_by_selector_or_fail(document, '#action-message');
    }
}

class MedTivaMenuListeners {
    constructor(
        public parent: MedTivaMenu
    ) {
        this.parent.elements.recruit_units_action.addEventListener('click', this.on_recruit_units_func);
        this.parent.app.events.listen<SelectFieldEvent>('select-field', this.on_select_field_func);
    }

    private on_select_field_func = (event: SelectFieldEvent) => {
        this.parent.logic.disable_all();
        this.parent.app.components.map.at_async(event.field).then(() => {
            const field = this.parent.app.components.map.at(event.field);
            if (!field) return;
            const is_my_city = is_city(field) && is_not_hidden(field) && field.data.player_id === this.parent.app.globals.player.id;
            if (is_my_city) {
                this.parent.logic.enable_recruit_units();
            }
        });
    }

    protected on_recruit_units_func = () => {
        debugger;
        // this.parent.elements.recruit_units.classList.add('js-active');
        this.parent.app.components.api.recruit({
            x: this.parent.app.components.map.properties.center_x,
            y: this.parent.app.components.map.properties.center_y,
            amount: 1,
            unit: "footman"
        }).then(({ field, player }) => {
            this.parent.app.globals.player.data = player.data;
            this.parent.app.components.map.update_field(field);
            this.parent.logic.reset_recruit_units();
            this.parent.logic.success();
        }).catch((error) => {
            this.parent.logic.error(error);
        });
    }
}

class MedTivaMenuProperties {
    constructor(
        public parent: MedTivaMenu
    ) {

    }
}

class MedTivaMenuLogic {
    constructor(
        public parent: MedTivaMenu
    ) {

    }

    public reset_recruit_units() {
        this.parent.elements.recruit_units.querySelectorAll('input').forEach((input: HTMLInputElement) => {
            input.value = "0";
        });
    }

    public enable_recruit_units() {
        this.reset_recruit_units();
        this.parent.elements.recruit_units.classList.add('js-active');
    }

    public disable_all() {
        this.parent.elements.recruit_units.classList.remove('js-active');
    }

    public error(error: any = { success: false }) {
        console.error(error);
        this.parent.elements.action_message.classList.remove('success');
        this.parent.elements.action_message.classList.add('error');
        const error_text = typeof error === "string" ? error : "Error";
        this.parent.elements.action_message.innerText = error_text;
    }

    public success(success: any = { success: true }) {
        console.log(success);
        this.parent.elements.action_message.classList.remove('error');
        this.parent.elements.action_message.classList.add('success');
        const success_text = typeof success === "string" ? success : "Action Excecuted";
        this.parent.elements.action_message.innerText = success_text;
    }
}