import { PaymentStrategy } from './PaymentStrategy';
import { retry } from '../../utils/retry';
import { TransientError } from '../../errors/TransientError';

export class StripeStrategy implements PaymentStrategy {
    async pay(amount: number): Promise<boolean> {
        // simulate transient network operation with retries
        const result = await retry(async () => {
            if (Math.random() < 0.4) {
                throw new TransientError('Temporary stripe failure');
            }
            // business validation
            if (amount <= 0) throw new Error('Invalid amount');
            return true;
        }, 4, 150);
        return result;
    }
}
