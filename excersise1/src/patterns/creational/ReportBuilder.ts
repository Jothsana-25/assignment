import { Report } from './Report';

export class ReportBuilder {
    private report: Report;
    constructor() { this.report = new Report(); }

    setTitle(title: string) {
        if (!title) throw new Error('Title required');
        this.report.title = title;
        return this;
    }

    setContent(content: string) {
        if (content == null) throw new Error('Content required');
        this.report.content = content;
        return this;
    }

    setAuthor(author: string) {
        this.report.author = author;
        return this;
    }

    build() {
        if (!this.report.title || !this.report.content) throw new Error('Incomplete report');
        this.report.timestamp = new Date();
        return this.report;
    }
}
