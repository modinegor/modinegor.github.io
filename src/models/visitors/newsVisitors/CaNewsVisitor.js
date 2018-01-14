import {BaseNewsConverter, LoggingConvert} from "./BaseNewsVisitor";


class CaNewsVisitor extends BaseNewsConverter {
    constructor() {
        super();
        this.regexp = /\s(ca|Ca)\s/;
        this.lang = 'CA';
    }
}

export const CaNewsConverter = new LoggingConvert(new CaNewsVisitor());
