import { MedTivaEvent } from "./MedTivaEvent";


interface MedTivaEventListener<Event extends MedTivaEvent> {
    (event: Event): void
}

interface MedTivaNamedEventListener {
    callback: (event: MedTivaEvent) => void
    event_type: string;
};


export class EventSocket {
    private listeners: Array<MedTivaNamedEventListener> = [];

    public listen<EVENT extends MedTivaEvent>(event_type: EVENT["name"], callback: MedTivaEventListener<EVENT>) {
        const listener: MedTivaNamedEventListener = {
            callback,
            event_type,
        } as MedTivaNamedEventListener;
        this.listeners.push(listener);
    }

    public dispatch(event: MedTivaEvent) {
        this.listeners.forEach((listener) => {
            if (listener.event_type === event.name) {
                listener.callback(event);
            }
        });
    }
}