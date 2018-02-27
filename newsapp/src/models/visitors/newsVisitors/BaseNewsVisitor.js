export class BaseNewsConverter {
    constructor() {
        this.regexp = undefined;
        this.lang = undefined;
    }

    convert(article) {
        if (article.description !== undefined) {
            article.description = article.description.replace(this.regexp, this.lang);
        }
    }
}

export class LoggingConvert {
    constructor(converter) {
        this.converter = converter;
    }

    convert(article) {
        let initial = article.description;
        this.converter.convert(article);

        if (initial !== article.description)
            console.log(`"${this.converter.lang}" occurrences were converted`)
    }
}
