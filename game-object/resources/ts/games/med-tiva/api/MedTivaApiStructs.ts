import { MedTivaFieldPosition } from "../structs/MedTivaFieldExtensions";

export interface MedTivaMe {
    gold: number,
    score: number,
}

export interface MedTivaField extends MedTivaFieldPosition {
    x: number,
    y: number,
    base_type: number,
    data: any,
}
