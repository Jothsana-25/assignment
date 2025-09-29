import { IDataProvider } from './DataProvider';

export class CachingDecorator implements IDataProvider {
    private cache = new Map<string, {value:string, ts:number}>();
    constructor(private provider: IDataProvider, private ttlMs = 5000) {}

    async fetch(key: string): Promise<string> {
        if (!key) throw new Error('key required');
        const now = Date.now();
        const cached = this.cache.get(key);
        if (cached && (now - cached.ts) < this.ttlMs) {
            return cached.value;
        }
        const val = await this.provider.fetch(key);
        this.cache.set(key, { value: val, ts: now });
        return val;
    }
}
