import { MedTivaBuildingBag } from "../structs/MedTivaBuildingBag";
import { MedTivaFieldPosition } from "../structs/MedTivaFieldExtensions";
import { MedTivaUnitBag } from "../structs/MedTivaUnitBag";

export interface MedTivaMe {
    id: number,
    display_name: string,
    data: {
        gold: number,
        score: number,
    }
}

export interface MedTivaField extends MedTivaFieldPosition {
    x: number,
    y: number,
    base_type: number,
    data: any,
}

export interface MedTivaPlane extends MedTivaField {
    base_type: 0;
    data: []
}

export interface MedTivaCity extends MedTivaField {
    base_type: 1;
    data: {
        player_id: number,
        danger_level: number,
        units: MedTivaUnitBag,
        buildings: MedTivaBuildingBag,
    } | {
        hidden: true,
    }
}

export interface MedTivaCave extends MedTivaField {
    base_type: 2;
    data: {
        danger_level: number,
        monsters: MedTivaUnitBag,
        ticks_until_spawn: number
    }
}

export function is_not_hidden<
    NARROWED_CITY extends Omit<MedTivaCity, 'data'> & { data: Exclude<MedTivaCity['data'], { hidden: true }> }
>(city: MedTivaCity): city is NARROWED_CITY {
    return ('hidden' in city.data) == false;
}

export function is_plane(field: MedTivaField): field is MedTivaPlane {
    return field.base_type === 0;
}

export function is_city(field: MedTivaField): field is MedTivaCity {
    return field.base_type === 1;
}

export function is_cave(field: MedTivaField): field is MedTivaCave {
    return field.base_type === 2;
}

