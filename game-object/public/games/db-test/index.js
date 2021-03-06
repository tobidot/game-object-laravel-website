window.onload = (() => {
    const app = document.getElementById("app");
    const api = new GameServerApi();
    const players = [];

    api.get_players().then((server_players) => {
        players.push(...server_players);
        players.forEach((player) => {
            const button = document.createElement("button");
            button.innerText = player.display_name;
            button.addEventListener("click", () => {
                api.action('score', {
                    player_id: player.id
                });
            });
            app.appendChild(button);
        });
        console.log(players);
        const player_points = players.map((player) => {
            return "player_" + player.id;
        });
        api.get_variables(player_points).then((points) => {
            console.log(points);
        });
        api.get_fields([{ x: 0, y: 0 }, { x: 1, y: 0 }]).then(fields => {
            console.log(fields);
        });

        const field_types = ["low", "med", "high"];
        const map = document.createElement('div');
        map.className = "map";
        api.get_fields([]).then(fields => {
            console.log(fields);
            fields.forEach((field) => {
                const field_el = document.createElement('div');
                field_el.className = "field field-type--" + field_types[field.base_type];
                field_el.setAttribute('data-x', field.x.toString());
                field_el.setAttribute('data-y', field.y.toString());
                map.append(field_el);
            });
        });
        app.appendChild(map);
    });

});
class GameServerApi {
    constructor() {
        const query = new URLSearchParams(window.location.search);
        this.auth_token = query.get("auth-token");
        const game_session = query.get("game-session");
        this.base_uri = "/api/game-sessions/" + game_session;
        this.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        console.log("Enter Game Session", game_session, "with auth_token", this.auth_token);
    }

    get_body(data) {
        return JSON.stringify(Object.assign({
            auth_token: this.auth_token
        }, data));
    }

    standard_fetch(target, data) {
        return fetch(target, {
            method: "POST",
            body: this.get_body(data),
            headers: this.headers
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (!('success' in json) || json.success !== true) {
                return Promise.reject("Fetching from server was not successfull", json);
            }
            return json.data;
        });
    }

    get_players() {
        const target = this.base_uri + "/players";
        const data = {};
        return this.standard_fetch(target, data);
    }

    get_variables(list) {
        const target = this.base_uri + "/data";
        const data = {
            variables: list
        };
        return this.standard_fetch(target, data);
    }

    get_fields(list) {
        const target = this.base_uri + "/fields";
        const data = {
            fields: list
        };
        return this.standard_fetch(target, data);
    }

    action(action, action_data = {}) {
        const target = this.base_uri + "/action";
        const data = {
            action,
            action_data
        };
        return this.standard_fetch(target, data);
    }
}

