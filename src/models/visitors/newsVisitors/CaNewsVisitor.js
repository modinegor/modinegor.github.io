import {BaseNewsConverter, LoggingConvert} from "./BaseNewsVisitor";


export default class CaNewsVisitor extends BaseNewsConverter {
    constructor() {
        super();
        this.regexp = /\s(ca|Ca)\s/;
        this.lang = 'CA';
    }
}
