import * as fs from 'fs';
import * as path from 'path';

export class Logger {
    private logFile: string;
    constructor(filename = 'app.log') {
        const logsDir = path.resolve(process.cwd(), 'logs');
        if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
        this.logFile = path.join(logsDir, filename);
    }

    info(message: string) {
        this.write('INFO', message);
    }

    warn(message: string) {
        this.write('WARN', message);
    }

    error(message: string) {
        this.write('ERROR', message);
    }

    private write(level: string, message: string) {
        const ts = new Date().toISOString();
        const line = `[${ts}] [${level}] ${message}\n`;
        // defensive: don't block, append asynchronously
        fs.appendFile(this.logFile, line, (err) => {
            if (err) console.error('Failed to write log:', err);
        });
        console.log(line.trim());
    }
}

export const logger = new Logger();
