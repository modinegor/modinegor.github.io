const apikey = '58c65ea125b949f39e840783834dae42';

(() => {
    window.addEventListener('load', init);
})(window, document, undefined);

let sources, shown_sources,
    init_filter = false;

function init() {
    showSources();
    showMessage("Chose source to see the news");

    document.getElementById('scroll-up').addEventListener('click', scrollSources);
    document.getElementById('scroll-down').addEventListener('click', scrollSources);
}

function showMessage(message) {
    document.getElementById('shown-articles').innerHTML = `<div id="info-message">${message}</div>`;
}

function showSources(category, country, language) {
    const base_url = 'https://newsapi.org/v2/sources';
    let requests = '';

    shown_sources = [];

    if (category)
        requests = `${requests}&category=${category}`;
    if (country)
        requests = `${requests}&country=${country}`;
    if (language)
        requests = `${requests}&language=${language}`;

    fetch(`${base_url}?${requests.substr(1)}&apiKey=${apikey}`)
        .then(response => response.json())
        .then((data) => {
            const shown = document.getElementById('shown-sources');

            shown.innerHTML = '';

            sources = data.sources;
            shuffle_array(sources);

            for (let i = 0; i < 3 && i < sources.length - 1; i++) {
                shown.appendChild((new Source(sources[i])).getHtmlElement());
                shown_sources.push(i);
            }

            if (!init_filter)
                initFilter();

        })
        .catch((err) => {
            showMessage(`Error: ${err}`);
        });
}

function initFilter() {
    let categories = new Set(),
        countries = new Set(),
        languages = new Set(),
        category_cmbx = document.getElementById('select-category'),
        language_cmbx = document.getElementById('select-language'),
        country_cmbx = document.getElementById('select-country');

    for (let source of sources) {
        categories.add(source.category);
        countries.add(source.country);
        languages.add(source.language);
    }

    for (let category of [...categories].sort()) {
        let option = document.createElement('option');
        option.innerHTML = category;
        category_cmbx.appendChild(option);
    }
    for (let country of [...countries].sort()) {
        let option = document.createElement('option');
        option.innerHTML = country;
        country_cmbx.appendChild(option);
    }
    for (let language of [...languages].sort()) {
        let option = document.createElement('option');
        option.innerHTML = language;
        language_cmbx.appendChild(option);
    }

    category_cmbx.addEventListener('change', changeFilter);
    country_cmbx.addEventListener('change', changeFilter);
    language_cmbx.addEventListener('change', changeFilter);

    init_filter = true;
}

function changeFilter() {
    const category_cmbx = document.getElementById('select-category'),
        language_cmbx = document.getElementById('select-language'),
        country_cmbx = document.getElementById('select-country');

    showSources(
        category_cmbx.options[category_cmbx.selectedIndex].text,
        country_cmbx.options[country_cmbx.selectedIndex].text,
        language_cmbx.options[language_cmbx.selectedIndex].text);
}

function scrollSources(event) {
    const {target:{id:target}} = event,
        div = document.getElementById('shown-sources'),
        child = div.childNodes;

    if (target === 'scroll-up' && shown_sources[0] !== 0) {
        shown_sources.pop();
        div.removeChild(child[child.length - 1]);
        div.insertBefore((new Source(sources[shown_sources[0] - 1])).getHtmlElement(), child[0]);
        shown_sources = [shown_sources[0] - 1, ...shown_sources];
    } else if (target === 'scroll-down' && shown_sources[shown_sources.length - 1] !== sources.length - 1) {
        shown_sources = shown_sources.slice(1);
        div.removeChild(child[0]);

        const new_item = shown_sources[shown_sources.length - 1] + 1;

        div.appendChild((new Source(sources[new_item])).getHtmlElement());
        shown_sources.push(new_item);
    }
}

function showArticles(event) {
    const target = event.target;

    fetch(`https://newsapi.org/v2/top-headlines?sources=${target.id}&apiKey=${apikey}`)
        .then(responce => responce.json())
        .then((data) => {
            let articles_div = document.getElementById('shown-articles');

            articles_div.innerHTML = '';

            for (let article of data.articles)
                articles_div.appendChild((new Article(article)).getHtmlElement());

        })
        .catch((err) => {
            showMessage(`Error: ${err}`);
        });
}

class Source {
    constructor(obj) {
        ({
            description: this.description,
            id: this.id,
            name: this.name,
            url: this.url,
        } = obj);

        return new Proxy(this, {
            set(target, name, value) {
                throw new Error('Source object is read only object');
            }
        })
    }

    getHtmlElement() {
        const div = document.createElement('div');

        div.className = 'source-item';
        div.innerHTML = `${this.logo}<div>${this.title}${this.button}</div>`;

        div.getElementsByClassName("read-source-button")[0].addEventListener('click', showArticles);

        return div;
    }

    get logo() {
        return `<img src="https://icons.better-idea.org/icon?url=${this.url}&size=50" class="source-logo" title="${this.description}"/>`;
    }

    get button() {
        return `<div class="read-source-button" id="${this.id}">Read Me</div>`;
    }

    get title() {
        return `<div class="source-name">${this.name}</div>`;
    }
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

        return new Proxy(this, {
            set(target, name, value) {
                throw new Error('Article object is read only object');
            },

            get(target, name) {
                if (name === 'description' || name === 'article_title') {
                    return target[name].replace(/(\d{5,})/g, (_, res) => {return parseInt(res).toLocaleString()});
                }
                return target[name];
            }
        })
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

function shuffle_array(array) {
    for (let i = 1; i < array.length; i++) {
        let rand_i = Math.floor(Math.random() * (i + 1));

        [array[i], array[rand_i]] = [array[rand_i], array[i]];
    }
}
