import * as readline from 'readline';
import { EventBus } from './patterns/observer/EventBus';
import { logger } from './utils/Logger';
import { PaymentProcessor } from './patterns/strategy/PaymentProcessor';
import { StripeStrategy } from './patterns/strategy/StripeStrategy';
import { PaypalStrategy } from './patterns/strategy/PaypalStrategy';
import { LoggerFactory } from './patterns/creational/LoggerFactory';
import { ReportBuilder } from './patterns/creational/ReportBuilder';
import { WeatherAdapter } from './patterns/structural/WeatherAdapter';
import { SimpleProvider } from './patterns/structural/DataProvider';
import { CachingDecorator } from './patterns/structural/CachingDecorator';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const bus = new EventBus();

bus.subscribe('log', (p) => {
    logger.info('EventBus log: ' + JSON.stringify(p));
});

// Register a periodic health event (no while(true) usage)
setInterval(() => {
    bus.publish('log', { healthy: true, ts: new Date().toISOString() });
}, 30_000); // every 30s

function showMenu() {
    console.log('\n--- Design Patterns Demo (TypeScript) ---');
    console.log('1) Observer: publish sample event');
    console.log('2) Strategy: simulate payment');
    console.log('3) Factory: create logger and log');
    console.log('4) Builder: build a report');
    console.log('5) Adapter: fetch weather via legacy API adapter');
    console.log('6) Decorator: fetch with caching provider');
    console.log('help) show menu');
    console.log('exit) quit');
    rl.prompt();
}

rl.on('line', async (line) => {
    const input = (line || '').trim();
    try {
        if (!input) { rl.prompt(); return; }
        if (input === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }
        if (input === 'help') { showMenu(); return; }

        switch (input) {
            case '1': {
                bus.publish('log', { event: 'sample', payload: Math.random() });
                console.log('Published sample event.');
                break;
            }
            case '2': {
                // choose strategy based on a simple heuristic
                const amt = 10;
                const proc = new PaymentProcessor(Math.random() > 0.5 ? new StripeStrategy() : new PaypalStrategy());
                const ok = await proc.checkout(amt);
                console.log('Payment result:', ok);
                break;
            }
            case '3': {
                const l = LoggerFactory.createLogger(Math.random() > 0.5 ? 'console' : 'file');
                l.info('Factory-created logger says hi.');
                break;
            }
            case '4': {
                const r = new ReportBuilder().setTitle('Monthly').setContent('All good').setAuthor('CLI Demo').build();
                console.log('Built report:', r);
                break;
            }
            case '5': {
                const wa = new WeatherAdapter();
                const w = await wa.fetch('Mumbai');
                console.log('Weather adapted:', w);
                break;
            }
            case '6': {
                const provider = new CachingDecorator(new SimpleProvider(), 5000);
                const v1 = await provider.fetch('key1');
                console.log('First fetch:', v1);
                const v2 = await provider.fetch('key1');
                console.log('Second fetch (should be cached):', v2);
                break;
            }
            default:
                console.log('Unknown command. Type "help" to show menu.');
        }
    } catch (err: any) {
        logger.error('Unhandled error in CLI: ' + (err?.message || err));
        console.error(err);
    } finally {
        rl.prompt();
    }
});

rl.on('close', () => {
    console.log('CLI closed.');
    process.exit(0);
});

showMenu();
