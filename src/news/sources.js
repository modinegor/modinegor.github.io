import {apikey} from "../helpers/const";
import {Error} from "./errors";
import {shuffle_array} from '../helpers/helpers.js';
import {showArticles} from "./articles";
import {htmlElement} from "../patterns/factory";


let sources, shown_sources,
    init_filter = false;

export function showSources(category, country, language) {
    const base_url = 'https://newsapi.org/v2/sources';
    let requests = '';

    shown_sources = [];

    if (category)
        requests = `${requests}&category=${category}`;
    if (country)
        requests = `${requests}&country=${country}`;
    if (language)
        requests = `${requests}&language=${language}`;

    fetch(`${base_url}?${requests.substr(1)}&apiKey=${apikey}`, {mode: 'cors', method: 'GET'})
        .then(response => response.json(),
            (err) => Error.show(`Error: ${err}`))
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

export function scrollSources(event) {
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

class Source {
    constructor(obj) {
        ({
            description: this.description,
            id: this.id,
            name: this.name,
            url: this.url,
        } = obj);
    }

    getHtmlElement() {
        const div = document.createElement('div');

        div.className = 'source-item';
        div.innerHTML = this.logo + htmlElement('div', {}, [this.title, this.button]);

        div.getElementsByClassName("read-source-button")[0].addEventListener('click', showArticles);

        return div;
    }

    get logo() {
        return htmlElement('image', {src: `https://icons.better-idea.org/icon?url=${this.url}&size=50`,
            class: 'source-logo', title: this.description});
    }

    get button() {
        return htmlElement('div', {class: 'read-source-button', id: this.id}, 'Read Me');
    }

    get title() {
        return htmlElement('div', {class: 'source-name'}, this.name);
    }
}
