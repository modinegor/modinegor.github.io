import {BaseNewsConverter} from "./BaseNewsVisitor";


export default class EnNewsVisitor extends BaseNewsConverter {
    constructor() {
        super();
        this.regexp = /\s(en|En)\s/;
        this.lang = 'EN';
    }
}
