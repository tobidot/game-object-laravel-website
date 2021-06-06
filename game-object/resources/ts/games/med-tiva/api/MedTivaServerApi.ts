import { GameServerApi } from "../../utils/GameServerApi";
import { MedTivaUnitBag } from "../structs/MedTivaUnitBag";
import { MedTivaField, MedTivaMe } from "./MedTivaApiStructs";

export class MedTivaServerApi extends GameServerApi {

    public get_me(): Promise<MedTivaMe> {
        return super.get_me() as Promise<MedTivaMe>;
    }

    public recruit(data: {
        x: number,
        y: number
        unit: "footman" | "villager",
        amount: number
    }) {
        return <Promise<{
            player: MedTivaMe,
            field: MedTivaField,
        }>>this.action('recruit', data);
    }

    public build(data: {
        x: number,
        y: number,
        building: "hut" | "training_camp"
    }) {
        return <Promise<{
            player: MedTivaMe,
            field: MedTivaField,
        }>>this.action('build', data);
    }

    public move(data: {
        x: number,
        y: number,
        target_x: number,
        target_y: number,
        units: MedTivaUnitBag
    }) {
        return <Promise<{
            player: MedTivaMe,
            field: MedTivaField,
        }>>this.action('move', data);
    }

}