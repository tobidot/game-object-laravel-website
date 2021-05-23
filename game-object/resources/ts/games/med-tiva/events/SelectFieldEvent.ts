import { MedTivaField } from "../api/MedTivaApiStructs";
import { MedTivaFieldPosition } from "../structs/MedTivaFieldExtensions";
import { MedTivaEvent } from "./MedTivaEvent";

export class SelectFieldEvent implements MedTivaEvent {
    public readonly name = "select-field";
    public constructor(
        public field: MedTivaFieldPosition
    ) {

    }
}