export type EventHandler<T = any> = (payload: T) => void;

export class EventBus {
    private handlers: Map<string, Set<EventHandler>> = new Map();

    subscribe<T>(event: string, handler: EventHandler<T>) {
        if (!event || typeof handler !== 'function') throw new Error('Invalid subscribe args');
        const set = this.handlers.get(event) ?? new Set<EventHandler>();
        set.add(handler);
        this.handlers.set(event, set);
        // return unsubscribe function
        return () => set.delete(handler);
    }

    publish<T>(event: string, payload?: T) {
        const set = this.handlers.get(event);
        if (!set) return;
        // defensive copy
        Array.from(set).forEach(h => {
            try { h(payload); } catch (e) { console.error('Event handler error', e); }
        });
    }
}
