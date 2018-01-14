import {apikey} from "../helpers/const";
import {Error} from "../errors";
import SourceBox from "./render";
import {AnimatedScrolling} from "./scrolling/animation";
import {SimpleScrolling} from "./scrolling/simple";


let init_filter = false;

export function showSources(category, country, language) {
    const base_url = 'https://newsapi.org/v2/sources';
    let requests = '';

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
            const box = new SourceBox(language === 'ru' ? SimpleScrolling : AnimatedScrolling);
            box.init(data.sources);

            if (!init_filter)
                initFilter(data.sources);
        });
}

function initFilter(sources) {
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
        box = new SourceBox();

    box.scroll(target === 'scroll-up');
}
