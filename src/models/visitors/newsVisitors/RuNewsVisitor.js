import {BaseNewsConverter, LoggingConvert} from "./BaseNewsVisitor";


class RuNewsVisitor extends BaseNewsConverter{
    constructor() {
        super();
        this.regexp = /\s(ru|Ru)\s/;
        this.lang = 'RU';
    }
}

const RuNewsConverter = new LoggingConvert(new RuNewsVisitor());

export default RuNewsConverter;
