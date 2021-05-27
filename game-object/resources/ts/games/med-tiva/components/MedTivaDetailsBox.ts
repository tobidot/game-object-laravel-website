import { is_cave, is_city, is_plane, MedTivaCave, MedTivaCity, MedTivaField, MedTivaPlane } from "../api/MedTivaApiStructs";
import { MedTivaFieldTypeHelper as MedTivaFieldTypes } from "../consts/MedTivaFieldTypes";
import { SelectFieldEvent } from "../events/SelectFieldEvent";
import { MedTivaUnit } from "../structs/MedTivaUnit";
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

type Extends<PARENT, CHILD> = CHILD extends PARENT ? true : never;

class MedTivaDetailsBoxLogic {

    public constructor(
        public parent: MedTivaDetailsBox
    ) {

    }

    public fill_info_box_with_field(field: MedTivaField) {
        if (is_plane(field)) {
            this.fill_info_box_with_plane(field);
        } else if (is_city(field)) {
            this.fill_info_box_with_city(field);
        } else if (is_cave(field)) {
            this.fill_info_box_with_cave(field);
        }
    }

    public fill_info_box_with_plane(plane: MedTivaPlane) {
        this.parent.elements.data.innerHTML = `
        <h1>Plane</h1>
        <p>
            Just a plane field.
        </p>
        `;
    }

    public fill_info_box_with_city(city: MedTivaCity) {
        this.parent.elements.data.innerHTML = `
        <h1>City</h1>
        <p>

        `;
    }

    public fill_info_box_with_cave(cave: MedTivaCave) {
        let amount_count = cave.data.monsters.goblin.count
            + cave.data.monsters.villager.count
            + cave.data.monsters.footman.count;
        let amount_text = this.verbalize_amount(amount_count);
        let monster_list = Object.entries(cave.data.monsters).map(([key, monster]: [string, MedTivaUnit]) => {
            return [
                key,
                monster.count,
                monster.level,
            ];
        });
        let details_table = this.table(monster_list);
        this.parent.elements.data.innerHTML = `
        <h1>Cave</h1>
        <p>
            A cave with ${amount_text} monsters, guarding possible treasures.
        </p>
        ${details_table}
        `;
    }

    public verbalize_amount(amount: number): string {
        if (amount < 5) return 'few';
        if (amount < 20) return 'a group of';
        if (amount < 100) return 'many';
        return 'hordes of';
    }

    public table(list: Array<Array<string | number>>) {
        const make_column_element = (value: string | number, extra_attrs: string = ''): string => {
            return `<td ${extra_attrs}>${value}</td>`;
        }
        const rows = list.map((value: Array<number | string>) => {
            return [
                '<tr>',
                value.map((value) => make_column_element(value)).join(''),
                '</tr>'
            ].join('');
        }).join('');
        return `
            <table>
            <thead></thead>
            <tbody>
                ${rows}
            </tbody>
            <table>
        `;
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
            const field_type = MedTivaFieldTypes.ALL[field.base_type];
            this.parent.elements.image.src = field_type.image_url;
            this.parent.logic.fill_info_box_with_field(field);
        });
    }
}