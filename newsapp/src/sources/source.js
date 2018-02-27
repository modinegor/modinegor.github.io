import HtmlMarkupStrategy from "../models/factory/HtmlMarkupFactory";
import actions from "../redux/actions";
import createStore from "../redux/store";


const store = new createStore();


export default class Source {
    constructor(obj) {
        ({
            id: this.id,
            name: this.name,
            url: this.url,
        } = obj);
        this.markupStrategy = HtmlMarkupStrategy;
    }

    getHtmlElement() {
        const div = document.createElement('div');

        div.className = 'source-item';

        div.innerHTML = this.logo + this.markupStrategy.create('div', {}, [this.title, this.button]);
        div.getElementsByClassName("read-source-button")[0].addEventListener('click', () => {
            store.dispatch({
                type: actions.news.GET_SOURCE_NEWS,
                source_id: this.id
            });
        });

        return div;
    }

    get logo() {
        return this.markupStrategy.create('image',
            {src: `https://icons.better-idea.org/icon?url=${this.url}&size=50`,
                class: 'source-logo'});
    }

    get button() {
        return this.markupStrategy.create('div', {class: 'read-source-button', id: this.id}, 'Read Me');
    }

    get title() {
        return this.markupStrategy.create('div', {class: 'source-name'}, this.name);
    }

    setStrategy(strategy) {
        this.markupStrategy = strategy;
    }
}
