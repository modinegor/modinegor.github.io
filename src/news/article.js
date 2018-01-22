import HtmlMarkupStrategy from "../models/factory/HtmlMarkupFactory";

export default class Article {
    constructor(obj) {
        ({
            description: this.description,
            title: this.article_title,
            publishedAt: this.time,
            url: this.url,
            source: {id: this.source_id, name: this.source_name},
            urlToImage: this.image_url,
        } = obj);
        this.markupStrategy = HtmlMarkupStrategy;
    }

    get publishedAt() {
        if (!this.time)
            return '';

        return ` @ ${(new Date(this.time)).toLocaleString()}`;
    }

    get head() {
        return this.markupStrategy.create('div', {class: 'article-head'},
            [this.source_name || this.source_id, this.publishedAt]);
    }

    get title() {
        return this.markupStrategy.create('div', {class: 'article-title'}, this.article_title);
    }

    get image() {
        if (!this.image_url)
            return '';

        return this.markupStrategy.create('link', {href: this.url, target: '_blank'},
            this.markupStrategy.create('div', {class: 'article-image'},
                this.markupStrategy.create('image', {src: this.image_url})));
    }

    get info() {
        if (!this.image_url) {
            const description = this.description || `Read this article on ${this.source_name || this.source_id} website`;
            return this.markupStrategy.create('link', {href: this.url, target: '_blank', class: 'article-info'},
                description);
        } else if (this.description)
            return this.markupStrategy.create('div', {class: 'article-info'}, this.description);

        return '';
    }

    getHtmlElement() {
        const div = document.createElement('div');

        div.className = 'article-item';
        div.innerHTML = `${this.head}${this.title}${this.image}${this.info}`;

        return div;
    }

    convertLang(converter) {
        converter.convert(this);
    }

    setStrategy(strategy) {
        this.markupStrategy = strategy;
    }
}