import {is_equal, shuffle_array} from "../helpers/helpers";
import Source from "./source";
import {apikey} from "../helpers/const";
import store from "../redux/store";
import actions from "../redux/actions";
import statuses from "../redux/statuses";


let instance;

export default class SourceBox {
    constructor() {
        if(instance)
            return instance;

        this.shown = [];
        this.init_filters = false;
        this.status = statuses.INIT;

        this.div = document.getElementById('shown-sources');
        this.div.innerHTML = '';

        instance = this;
    }

    show() {
        const state = store.getState().sources;

        if (state.status === this.status)
            return;

        this.status = state.status;

        if (this.status === statuses.PENDING) {

            const base_url = 'https://newsapi.org/v2/sources';
            let requests = '';

            if (state.filter.category !== undefined)
                requests += `&category=${state.filter.category}`;
            if (state.filter.country !== undefined)
                requests += `&country=${state.filter.country}`;
            if (state.filter.language !== undefined)
                requests += `&language=${state.filter.language}`;

            fetch(`${base_url}?${requests.substr(1)}&apiKey=${apikey}`, {mode: 'cors', method: 'GET'})
                .then(response => response.json(),
                    (err) => store.dispatch({type: actions.errors.LOAD_SOURCES_ERROR, message: err}))
                .then((data) => {
                    if (!this.init_filters)
                        this.initFilter(data.sources);

                    this.shown = [];
                    this.div.innerHTML = '';

                    this.status = statuses.SUCCESS;
                    store.dispatch({
                        type: actions.sources.LOAD_SOURCES_COMPLETED,
                        data: shuffle_array(data.sources),
                        shown: [0, 1, 2]});
                });
        }
    }

    change() {
        const state = store.getState().sources;

        if (is_equal(this.shown, state.shown))
            return;

        const children = this.div.childNodes;

        for (let i of this.shown.filter(i => state.shown.indexOf(i) === -1))
            this.div.removeChild(children[this.shown.indexOf(i)])
        for (let i of state.shown.filter(i => this.shown.indexOf(i) === -1)) {
            let new_child = (new Source(state.data[i])).getHtmlElement();

            if (this.shown.length > 0 && i < this.shown[0])
                this.div.insertBefore(new_child, children[0]);
            else if (this.shown.length === 0 || i > this.shown[this.shown.length - 1])
                this.div.appendChild(new_child);
        }

        this.shown = [...state.shown];
    }

    initFilter(sources) {
        let categories = new Set(),
            countries = new Set(),
            languages = new Set();
        const category_cmbx = document.getElementById('select-category'),
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

        category_cmbx.addEventListener('change', () => store.dispatch({
            type: actions.sources.GET_SOURCES_LIST,
            filter: {
                category: category_cmbx.options[category_cmbx.selectedIndex].text
            }
        }));
        country_cmbx.addEventListener('change', () => store.dispatch({
            type: actions.sources.GET_SOURCES_LIST,
            filter: {
                country: country_cmbx.options[country_cmbx.selectedIndex].text
            }
        }));
        language_cmbx.addEventListener('change', () => store.dispatch({
            type: actions.sources.GET_SOURCES_LIST,
            filter: {
                language: language_cmbx.options[language_cmbx.selectedIndex].text
            }
        }));

        this.init_filters = true;
    }
}
