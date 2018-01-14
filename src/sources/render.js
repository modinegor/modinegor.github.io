import {shuffle_array} from "../helpers/helpers";
import Source from "./source";
import {SimpleScrolling} from "./scrolling/simple";


let instance;

export default class SourceBox {
    constructor(scrolling) {
        this.scrolling = scrolling || this.scrolling || SimpleScrolling;

        if(instance)
            return instance;

        this.data = null;
        this.shown = null;

        this.div = document.getElementById('shown-sources');

        instance = this;
    }

    init(data) {
        shuffle_array(data);

        this.div.innerText = '';
        this.data = data;
        this.shown = [];

        for (let i = 0; i < 3 && i < this.data.length - 1; i++) {
            let source = new Source(this.data[i]);

            this.div.appendChild(source.getHtmlElement());
            this.shown.push(i);
        }
    }

    scroll(up) {
        if (up && this.shown[0] === 0)
            return;
        if (!up && this.shown[this.shown.length - 1] === this.data.length - 1)
            return;

        const childNodes = this.div.childNodes,
            new_item = up ? this.shown[0] : this.shown[this.shown.length - 1] + 1,
            toHide = up ? childNodes[childNodes.length - 1] : childNodes[0],
            toShow = (new Source(this.data[new_item])).getHtmlElement(),
            showAttributes = this.scrolling.getShowAttributes(),
            hideAttributes = this.scrolling.getHideAttributes(),
            transition = this.scrolling.getTransitionAttributes();

        console.log(transition, showAttributes, hideAttributes);

        if (showAttributes)
            toShow.setAttribute('style', showAttributes);
        if (hideAttributes)
            toHide.setAttribute('style', hideAttributes);

        if (up) {
            this.div.insertBefore(toShow, childNodes[0]);
            this.shown.pop();
            this.shown = [this.shown[0] - 1, ...this.shown];
        }
        else {
            this.div.appendChild(toShow);
            this.shown = this.shown.slice(1);
            this.shown.push(new_item);
        }

        if (transition !== undefined) {
            toHide.setAttribute('transition', transition);
            toShow.setAttribute('transition', transition);
        }
        this.scrolling.animate(toHide, toShow);

        this.div.removeChild(toHide);
    }
}
