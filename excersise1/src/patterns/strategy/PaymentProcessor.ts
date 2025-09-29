import { PaymentStrategy } from './PaymentStrategy';

export class PaymentProcessor {
    constructor(private strategy: PaymentStrategy) {}

    setStrategy(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    async checkout(amount: number) {
        if (!this.strategy) throw new Error('No payment strategy provided');
        return this.strategy.pay(amount);
    }
}
