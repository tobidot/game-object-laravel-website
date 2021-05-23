import { get_element_by_selector_or_fail } from "../utils/dom-helpers";

export class Settings {
    public elements: SettingsElements;
    public listeners: SettingsListeners;

    constructor(
        settings_element: HTMLElement
    ) {
        this.elements = new SettingsElements(this, settings_element);
        this.listeners = new SettingsListeners(this);
    }

    public reveal() {
        this.elements.reveal();
    }

    public hide() {
        this.elements.hide();
    }
}

class SettingsElements {
    public close_button: HTMLButtonElement;

    public constructor(
        public parent: Settings,
        public settings_element: HTMLElement
    ) {
        this.close_button = get_element_by_selector_or_fail(settings_element, '.settings__close-button', HTMLButtonElement);
    }

    public reveal() {
        this.settings_element.classList.remove('js-hidden');
    }

    public hide() {
        this.settings_element.classList.add('js-hidden');
    }

    public is_visible(): boolean {
        return !this.settings_element.classList.contains('js-hidden');
    }
}

class SettingsListeners {
    public constructor(
        public parent: Settings
    ) {
        document.addEventListener('keydown', this.on_keypress);
        this.parent.elements.close_button.addEventListener('click', this.on_close_button_click);
    }

    protected on_close_button_click = () => {
        this.parent.hide();
    }

    protected on_keypress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            if (this.parent.elements.is_visible()) {
                this.parent.hide();
            } else {
                this.parent.reveal();
            }
        }
    }
}

