import { MedTivaMe } from "../med-tiva/api/MedTivaApiStructs";

type MappedData = { [key: string]: any };

export class GameServerApi {
    protected auth_token: string | null;
    protected game_session_id: string;
    protected base_uri: string;
    protected headers: { [header: string]: string };

    constructor() {
        const query = new URLSearchParams(window.location.search);
        this.auth_token = query.get("auth-token");
        this.game_session_id = query.get("game-session")!;
        if (!this.game_session_id) throw new Error("Unable to initialize GameServerApi");
        this.base_uri = "/api/game-sessions/" + this.game_session_id;
        this.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        console.log("Enter Game Session", this.game_session_id, "with auth_token", this.auth_token);
    }

    public get_body(data: MappedData): string {
        return JSON.stringify(Object.assign({
            auth_token: this.auth_token
        }, data));
    }

    public async standard_fetch(target: string, data: object): Promise<MappedData> {
        return fetch(target, {
            method: "POST",
            body: this.get_body(data),
            headers: this.headers
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (!('success' in json) || json.success !== true) {
                return Promise.reject({
                    reason: "Fetching from server was not successfull",
                    details: json
                });
            }
            return json.data;
        });
    }

    public get_me(): Promise<MappedData> {
        const target = this.base_uri + "/me";
        const data = {};
        return this.standard_fetch(target, data);
    }

    public get_players(): Promise<MappedData> {
        const target = this.base_uri + "/players";
        const data = {};
        return this.standard_fetch(target, data);
    }

    public async get_variables(list: Array<string>): Promise<MappedData> {
        const target = this.base_uri + "/data";
        const data = {
            variables: list
        };
        return this.standard_fetch(target, data);
    }

    public async get_fields(list: Array<{ x: number, y: number }>): Promise<MappedData> {
        const target = this.base_uri + "/fields";
        const data = {
            fields: list
        };
        return this.standard_fetch(target, data);
    }

    public async action(action: string, action_data: MappedData = {}): Promise<MappedData> {
        const target = this.base_uri + "/action";
        const data = {
            action,
            action_data
        };
        return this.standard_fetch(target, data);
    }
}
