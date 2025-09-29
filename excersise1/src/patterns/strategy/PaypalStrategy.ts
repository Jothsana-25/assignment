import { PaymentStrategy } from './PaymentStrategy';

export class PaypalStrategy implements PaymentStrategy {
    async pay(amount: number): Promise<boolean> {
        if (amount <= 0) throw new Error('Invalid amount');
        // simulated immediate success
        return Promise.resolve(true);
    }
}
