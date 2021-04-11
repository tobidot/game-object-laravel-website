(() => {
    const query = new URLSearchParams(window.location.search);
    const auth_token = query.get("auth-token");
    const game_session = query.get("game-session");
    console.log("Enter Game Session", game_session, "with auth_token", auth_token);
    const target = "/api/game-sessions/" + game_session;
    console.log(target);
    // const target = "/api/user";
    fetch(target, {
        method: "POST",
        body: JSON.stringify({ auth_token }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
    }).catch((e) => {
        console.log('failed');
        console.log(e);
    })
})();