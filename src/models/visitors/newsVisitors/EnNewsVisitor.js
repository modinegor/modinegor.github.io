import {BaseNewsConverter, LoggingConvert} from "./BaseNewsVisitor";


class EnNewsVisitor extends BaseNewsConverter {
    constructor() {
        super();
        this.regexp = /\s(en|En)\s/;
        this.lang = 'EN';
    }
}

export const EnNewsConverter = new LoggingConvert(new EnNewsVisitor());
