import { is_cave, is_city, is_plane, MedTivaCave, MedTivaCity, MedTivaField, MedTivaPlane } from "../api/MedTivaApiStructs";
import { MedTivaFieldTypeHelper as MedTivaFieldTypes } from "../consts/MedTivaFieldTypes";
import { SelectFieldEvent } from "../events/SelectFieldEvent";
import { MedTivaUnit } from "../structs/MedTivaUnit";
import { MedTivaUnitBag } from "../structs/MedTivaUnitBag";
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
        <h2>Plane</h2>
        <p>
            Just a plane field.
        </p>
        `;
    }

    public fill_info_box_with_city(city: MedTivaCity) {
        const data = city.data;
        if ('hidden' in data) {
            return this.parent.elements.data.innerHTML = `
                <h2>City</h2>
                <p>
                You have no information about this city.
                </p>
                `;
        }
        const details = this.table_for_unit_bag(data.units);
        const general = this.table([
            ['player|center bold', data.player_id],
        ])
        this.parent.elements.data.innerHTML = `
    <h2>City</h2>
    <h3>General</h3>
    ${general}
    <h3 class="center">Units</h3>
    ${details}
    `;
    }

    public fill_info_box_with_cave(cave: MedTivaCave): void {
        let amount_count = cave.data.monsters.goblin.count
            + cave.data.monsters.villager.count
            + cave.data.monsters.footman.count;
        let amount_text = this.verbalize_amount(amount_count);
        const details = this.table_for_unit_bag(cave.data.monsters);
        this.parent.elements.data.innerHTML = `
        <h2>Cave</h2>
        <p>
            A cave with ${amount_text} monsters, guarding possible treasures.
        </p>
        <h3 class="center">Monsters</h3>
        ${details}
        `;
    }

    public table_for_unit_bag(units: MedTivaUnitBag): string {
        let unit_list = [
            ["Name|bold center", "Amount|bold center", "Level|bold center"],
            ...Object.entries(units).map(([key, unit]: [string, MedTivaUnit]) => {
                return [
                    key,
                    unit.count,
                    unit.level,
                ];
            })
        ];
        return this.table(unit_list);
    }

    public verbalize_amount(amount: number): string {
        if (amount < 5) return 'few';
        if (amount < 20) return 'a group of';
        if (amount < 100) return 'many';
        return 'hordes of';
    }

    public table(list: Array<Array<string | number>>) {
        const make_column_element = (value: string | number): string => {
            let cname = "";
            if (typeof value === "string") {
                [value, cname] = value.split('|');
            }
            return `<td class="${cname || ""}">${value}</td>`;
        }
        const rows = list.map((value: Array<number | string>) => {
            return [
                '<tr>',
                value.map(make_column_element).join(''),
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