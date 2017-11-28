let apikey = '58c65ea125b949f39e840783834dae42';

(() => {
    window.onload = init;
})(window, document, undefined);

let sources, shown,
    init_filter = false;

function init() {
    showSources();
    showMessage("Chose source to see the news");

    document.getElementById('scroll-up').onclick = scrollSources;
    document.getElementById('scroll-down').onclick = scrollSources;
}

function showMessage(message) {
    let message_div = document.createElement('div');

    message_div.innerHTML = message;
    message_div.id = 'info-message';

    document.getElementById('shown-articles').appendChild(message_div);
}

function showSources(category, country, language) {
    let base_url = 'https://newsapi.org/v2/sources',
        requests = '';

    shown = [];

    if (category)
        requests = `${requests}&category=${category}`;
    if (country)
        requests = `${requests}&country=${country}`;
    if (language)
        requests = `${requests}&language=${language}`;

    fetch(`${base_url}?${requests.substr(1)}&apiKey=${apikey}`)
        .then(response => response.json())
        .then((data) => {
            let shown_sources = document.getElementById('shown-sources');

            shown_sources.innerHTML = '';

            sources = data.sources;
            sources.shuffle();

            for (let i = 0; i < 3 && i < sources.length - 1; i++) {
                shown_sources.appendChild((new Source(sources[i])).div);
                shown.push(i);
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

    for (let category of Array.from(categories).sort()) {
        let option = document.createElement('option');
        option.innerHTML = category;
        category_cmbx.appendChild(option);
    }
    for (let country of Array.from(countries).sort()) {
        let option = document.createElement('option');
        option.innerHTML = country;
        country_cmbx.appendChild(option);
    }
    for (let language of Array.from(languages).sort()) {
        let option = document.createElement('option');
        option.innerHTML = language;
        language_cmbx.appendChild(option);
    }

    category_cmbx.onchange = changeFilter;
    country_cmbx.onchange = changeFilter;
    language_cmbx.onchange = changeFilter;

    init_filter = true;
}

function changeFilter() {
    let category_cmbx = document.getElementById('select-category'),
        language_cmbx = document.getElementById('select-language'),
        country_cmbx = document.getElementById('select-country');

    showSources(
        category_cmbx.options[category_cmbx.selectedIndex].text,
        country_cmbx.options[country_cmbx.selectedIndex].text,
        language_cmbx.options[language_cmbx.selectedIndex].text)
}

function scrollSources(event) {
    document.getElementById('scroll-up').onclick = null;
    document.getElementById('scroll-down').onclick = null;

    let {target:{id:target}} = event,
        div = document.getElementById('shown-sources'),
        child = div.childNodes;

    if (target == 'scroll-up' && shown[0] != 0) {
        shown.pop();
        div.removeChild(child[child.length - 1]);
        div.insertBefore((new Source(sources[shown[0] - 1])).div, child[0]);
        shown = [shown[0] - 1, ...shown];
    } else if (target == 'scroll-down' && shown[shown.length - 1] != sources.length - 1) {
        shown = shown.slice(1);
        div.removeChild(child[0]);

        let new_item = shown[shown.length - 1] + 1;

        div.appendChild((new Source(sources[new_item])).div);
        shown.push(new_item);
    }

    document.getElementById('scroll-up').onclick = scrollSources;
    document.getElementById('scroll-down').onclick = scrollSources;
}

function showArticles(event) {
    let target = event.target;

    target.onclick = null;

    fetch(`https://newsapi.org/v2/top-headlines?sources=${target.id}&apiKey=${apikey}`)
        .then(responce => responce.json())
        .then((data) => {
            let articles_div = document.getElementById('shown-articles');

            articles_div.innerHTML = '';

            for (let article of data.articles)
                articles_div.appendChild((new Article(article)).div);

        })
        .catch((err) => {
            console.log(err);
            showMessage(`Error: ${err}`);
        });

    target.onclick = showArticles;
}

class Source {
    constructor(obj) {
        ({
            description: this.description,
            id: this.id,
            name: this.name,
            url: this.url,
        } = obj);
    }

    get div() {
        let div = document.createElement('div'),
            box = document.createElement('div');

        box.appendChild(this.title);
        box.appendChild(this.button);
        div.appendChild(this.logo);
        div.appendChild(box);

        div.className = 'source-item';

        return div;
    }

    get logo() {
        let div = document.createElement('img');

        div.setAttribute('src', `https://icons.better-idea.org/icon?url=${this.url}&size=50`);
        div.setAttribute('title', this.description);
        div.className = 'source-logo';

        return div;
    }

    get button() {
        let div = document.createElement('div');

        div.className = 'read-source-button';
        div.id = this.id;
        div.appendChild(document.createTextNode('Read Me'));

        div.onclick = showArticles;

        return div;
    }

    get title() {
        let div = document.createElement('div');

        div.appendChild(document.createTextNode(this.name));
        div.className = 'source-name';

        return div;
    }
}

class Article {
    constructor(obj) {
        ({
            description: this.description,
            title: this.article_title,
            url: this.url,
            urlToImage: this.image_url,
        } = obj);
    }

    get title() {
        let div = document.createElement('div');

        div.appendChild(document.createTextNode(this.article_title));
        div.className = 'article-title';

        return div;
    }

    get link() {
        let link = document.createElement('a');

        link.setAttribute('href', this.url);
        link.setAttribute('target', '_blank');

        return link;
    }

    get image() {
        if (!this.image_url)
            return null;

        let link = this.link,
            image_div = document.createElement('div'),
            image = document.createElement('img');

        image.setAttribute('src', this.image_url);

        image_div.className = 'article-image';
        image_div.appendChild(image);

        link.appendChild(image_div);

        return link;
    }

    get info() {
        let div = this.image_url ? document.createElement('div') : this.link;

        div.appendChild(document.createTextNode(this.description));
        div.className = 'article-info';

        return div;
    }

    get div() {
        let div = document.createElement('div');

        div.className = 'article-item';

        div.appendChild(this.title);
        this.image_url && div.appendChild(this.image);
        div.appendChild(this.info);

        return div;
    }
}

Array.prototype.shuffle = function() {
    for (let i = 1; i < this.length; i++) {
        let rand_i = Math.floor(Math.random() * (i + 1));

        [this[i], this[rand_i]] = [this[rand_i], this[i]];
    }
};
