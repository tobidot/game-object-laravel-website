export class EventDelegator {
    public settings: EventDelegatorSettings;

    constructor() {
        this.settings = new EventDelegatorSettings(this);
    }
}

class EventDelegatorSettings {
    constructor(
        public parent: EventDelegator
    ) {

    }

    public on_button_click(trigger: string) {
        trigger = trigger.replaceAll('-', '_');
        if (!this.is_allowed_trigger(trigger)) return;
        const func = this[trigger];
        if (typeof func !== "function") return;
        func(trigger);
    }

    protected is_allowed_trigger(trigger: string): trigger is keyof EventDelegatorSettings {
        return trigger in this;
    }

    protected reload() {
        window.location.reload();
    }

    protected back_to_lobby() {
        const params = new URLSearchParams(window.location.search);
        window.location.href = '/game-sessions/' + params.get('game-session');
    }
}