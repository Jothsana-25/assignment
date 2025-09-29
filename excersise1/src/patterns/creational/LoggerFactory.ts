import { Logger } from '../../utils/Logger';

export interface IAppLogger {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
}

export class ConsoleLogger implements IAppLogger {
    info(msg: string){ console.log('[INFO]', msg); }
    warn(msg: string){ console.warn('[WARN]', msg); }
    error(msg: string){ console.error('[ERROR]', msg); }
}

export class FileLogger implements IAppLogger {
    private logger = new Logger('factory.log');
    info(msg: string){ this.logger.info(msg); }
    warn(msg: string){ this.logger.warn(msg); }
    error(msg: string){ this.logger.error(msg); }
}

export class LoggerFactory {
    static createLogger(type: 'console' | 'file'): IAppLogger {
        if (type === 'file') return new FileLogger();
        return new ConsoleLogger();
    }
}
