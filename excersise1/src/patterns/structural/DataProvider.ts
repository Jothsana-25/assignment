export interface IDataProvider {
    fetch(key: string): Promise<string>;
}

export class SimpleProvider implements IDataProvider {
    async fetch(key: string): Promise<string> {
        // simulate I/O
        await new Promise(r => setTimeout(r, 50));
        return `value-for-${key}-${Date.now()}`;
    }
}
