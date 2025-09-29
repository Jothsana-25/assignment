export class Report {
    title: string;
    content: string;
    author?: string;
    timestamp: Date;
    constructor() {
        this.title = '';
        this.content = '';
        this.timestamp = new Date();
    }
}
