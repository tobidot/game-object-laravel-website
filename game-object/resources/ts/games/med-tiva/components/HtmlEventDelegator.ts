export class HtmlEventDelegator {
    public logic: HtmlEventDelegatorLogic;
    public listeners: HtmlEventDelegatorListeners;

    constructor() {
        this.logic = new HtmlEventDelegatorLogic(this);
        this.listeners = new HtmlEventDelegatorListeners(this);
    }
}


class HtmlEventDelegatorLogic {
    constructor(
        public parent: HtmlEventDelegator
    ) {

    }

    /**
     * 
     * @param trigger 
     *  Trigger Id for the button
     * @returns 
     */
    public on_html_button_click(trigger: string) {
        trigger = trigger.replaceAll('-', '_');
        if (!this.is_allowed_trigger(trigger)) return;
        const func = this[trigger];
        if (typeof func !== "function") return;
        func(trigger);
    }

    protected is_allowed_trigger(trigger: string): trigger is keyof HtmlEventDelegatorLogic {
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


class HtmlEventDelegatorListeners {

    public constructor(
        public parent: HtmlEventDelegator
    ) {
        document.body.addEventListener('click', this.on_any_button_click);
    }

    protected on_any_button_click = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const trigger = target.getAttribute('data-trigger');
        if (!trigger) return;
        window.app.components.event_delegator.logic.on_html_button_click(trigger);
    }
}