import {BaseNewsConverter, LoggingConvert} from "./BaseNewsVisitor";


class RuNewsVisitor extends BaseNewsConverter{
    constructor() {
        super();
        this.regexp = /\s(ru|Ru)\s/;
        this.lang = 'RU';
    }
}

export const RuNewsConverter = new LoggingConvert(new RuNewsVisitor());
