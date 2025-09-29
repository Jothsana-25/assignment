import { logger } from './Logger';

export async function retry<T>(fn: () => Promise<T>, attempts = 3, baseDelay = 200): Promise<T> {
    if (attempts < 1) throw new Error('attempts must be >= 1');
    let lastErr: unknown;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (err: unknown) {
            lastErr = err;
            const delay = baseDelay * Math.pow(2, i); // exponential backoff

            // Defensive: extract error message safely
            const msg = err instanceof Error ? err.message : JSON.stringify(err);

            logger.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms. Error: ${msg}`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw lastErr;
}
