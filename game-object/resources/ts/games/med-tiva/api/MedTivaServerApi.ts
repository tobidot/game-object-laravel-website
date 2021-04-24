import { GameServerApi } from "../../utils/GameServerApi";
import { MedTivaField, MedTivaMe } from "./ApiStructs";

export class MedTivaServerApi extends GameServerApi {
    public recruit(data: {
        x: number,
        y: number
        unit: "footman",
        amount: number
    }): Promise<{
        player: MedTivaMe,
        field: MedTivaField,
    }> {
        return <any>this.action('recruit', data);
    }
}