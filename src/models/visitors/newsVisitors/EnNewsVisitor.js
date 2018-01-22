import {BaseNewsConverter, LoggingConvert} from "./BaseNewsVisitor";


class EnNewsVisitor extends BaseNewsConverter {
    constructor() {
        super();
        this.regexp = /\s(en|En)\s/;
        this.lang = 'EN';
    }
}

const EnNewsConverter = new LoggingConvert(new EnNewsVisitor());

export default EnNewsConverter;
