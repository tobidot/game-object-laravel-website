import { MedTivaApp } from "../components/MedTivaApp";

interface MedTivaFieldTypeStaticData {
    id: string;
    name: string;
    image_url: string;
}

export class MedTivaFieldTypeHelper {
    public static readonly ALL = [
        {
            id: "plane",
            name: "Plane",
            image_url: "/games/med-tiva/images/plane.svg",
        },
        {
            id: "city",
            name: "City",
            image_url: "/games/med-tiva/images/city.svg",
        },
        {
            id: "cavern",
            name: "Cavern",
            image_url: "/games/med-tiva/images/cavern.svg",
        },
    ];

    public static readonly ALL_NAMED = new Map<string, MedTivaFieldTypeStaticData>(
        MedTivaFieldTypeHelper.ALL.map((data) => {
            return [
                data.id,
                data
            ]
        })
    );

    public constructor(
        public app: MedTivaApp
    ) {


    }
}
