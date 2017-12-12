import {apikey} from "../helpers/const";
import {showMessage} from "./errors";


export function showArticles(event) {
    fetch(`https://newsapi.org/v2/top-headlines?sources=${event.target.id}&apiKey=${apikey}`, {mode: 'cors', method: 'GET'})
        .then(response => response.json(),
            err => showMessage(`Error: ${err}`))
        .then((data) => {
            let articles_div = document.getElementById('articles');

            articles_div.innerHTML = '';

            for (let article of data.articles)
                articles_div.appendChild((new Article(article)).getHtmlElement());
        });
}

class Article {
    constructor(obj) {
        ({
            description: this.description,
            title: this.article_title,
            publishedAt: this.time,
            url: this.url,
            source: {id: this.source_id, name: this.source_name},
            urlToImage: this.image_url,
        } = obj);
    }

    get publishedAt() {
        if (!this.time)
            return '';

        return ` @ ${(new Date(this.time)).toLocaleString()}`;
    }

    get head() {
        return `<div class="article-head">${this.source_name || this.source_id}${this.publishedAt}</div>`;
    }

    get title() {
        return `<div class="article-title">${this.article_title}</div>`;
    }

    get image() {
        if (!this.image_url)
            return '';

        return `<a href="${this.url}" target="_blank"><div class="article-image"><img src="${this.image_url}"/></div></a>`;
    }

    get info() {
        if (!this.image_url) {
            const description = this.description || `Read this article on ${this.source_name || this.source_id} website`;
            return `<a href="${this.url}" target="_blank" class="article-info">${description}</a>`;
        } else if (this.description)
            return `<div class="article-info">${this.description}</div>`;

        return '';
    }

    getHtmlElement() {
        const div = document.createElement('div');

        div.className = 'article-item';
        div.innerHTML = `${this.head}${this.title}${this.image}${this.info}`;

        return div;
    }
}