import { MedTivaApp } from "./MedTivaApp";

interface MedTivaFieldTypeStaticData {
    id: string;
    name: string;
    image_url: string;
}

export class MedTivaFieldTypeHelper {
    public readonly ALL = [
        {
            id: "plane",
            name: "Plane",
            image_url: "/games/med-tiva/images/plane.svg",
        },
        {
            id: "cavern",
            name: "Cavern",
            image_url: "/games/med-tiva/images/cavern.svg",
        },
        {
            id: "city",
            name: "City",
            image_url: "/games/med-tiva/images/city.svg",
        },
    ];
    public readonly ALL_NAMED;

    public constructor(
        public app: MedTivaApp
    ) {
        this.ALL_NAMED = new Map<string, MedTivaFieldTypeStaticData>(
            this.ALL.map((data) => {
                return [
                    data.id,
                    data
                ]
            })
        );

    }
}