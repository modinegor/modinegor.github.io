import {HtmlMarkupStrategy} from "../models/factory/HtmlMarkupFactory";
import {showArticles} from "../news/main";


export default class Source {
    constructor(obj) {
        ({
            description: this.description,
            id: this.id,
            name: this.name,
            url: this.url,
        } = obj);
        this.markupStrategy = HtmlMarkupStrategy;
    }

    getHtmlElement() {
        const div = document.createElement('div');
        let content = '';

        div.className = 'source-item';
        content = this.logo + this.markupStrategy.create('div', {}, [this.title, this.button]);

        div.innerHTML = content;
        div.getElementsByClassName("read-source-button")[0].addEventListener('click', showArticles);

        return div;
    }

    get logo() {
        return this.markupStrategy.create('image',
            {src: `https://icons.better-idea.org/icon?url=${this.url}&size=50`,
                class: 'source-logo',
                title: this.description});
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