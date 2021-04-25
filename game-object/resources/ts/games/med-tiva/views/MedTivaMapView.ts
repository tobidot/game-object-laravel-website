import { MedTivaField } from "../api/MedTivaApiStructs";

export class MedTivaMapView {

    public fields: Map<string, MedTivaField> = new Map();
    public field_elements: Map<string, HTMLElement> = new Map();

    public constructor(
        public map: HTMLElement
    ) {
        map.className = "map";
        for (let x = 0; x < 5; ++x) {
            for (let y = 0; y < 5; ++y) {
                const field_el = document.createElement('div');
                field_el.className = "field field-type--plane";
                field_el.setAttribute('data-x', x.toString());
                field_el.setAttribute('data-y', y.toString());
                field_el.setAttribute('data-key', [x, y].join(','));
                this.field_elements.set([x, y].join(','), field_el);
                map.append(field_el);
            }
        }
    }

    public async refresh(): Promise<this> {
        return window.api.get_fields([]).then(fields => {
            fields.forEach((field: MedTivaField) => {
                this.fields.set([field.x, field.y].join(','), field);
            });
            return this;
        });
    }

    public redraw() {
        const field_types = ["plane", "cave", "city"];
        for (let element of this.field_elements.values()) {
            let field = this.fields.get(element.getAttribute('data-key')!);
            element.className = "field field-type--" + field_types[field?.base_type ?? 0];
        }
    }
}