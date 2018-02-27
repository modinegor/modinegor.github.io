import {BaseNewsConverter} from "./BaseNewsVisitor";


export default class RuNewsVisitor extends BaseNewsConverter{
    constructor() {
        super();
        this.regexp = /\s(ru|Ru)\s/;
        this.lang = 'RU';
    }
}
