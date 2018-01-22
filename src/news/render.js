import Article from "./article";
import {apikey} from "../helpers/const";
import store from "../redux/store";
import RuNewsConverter from "../models/visitors/newsVisitors/RuNewsVisitor";
import CaNewsConverter from "../models/visitors/newsVisitors/CaNewsVisitor";
import EnNewsConverter from "../models/visitors/newsVisitors/EnNewsVisitor";
import actions from "../redux/actions";
import statuses from "../redux/statuses";


let instance;

export default class NewsBox {
    constructor() {
        if (instance)
            return instance;

        this.div = document.getElementById('articles');
        this.source_id = undefined;
        this.status = statuses.INIT;

        instance = this;
    }

    show() {
        const state = store.getState().news;

        if (state.status === this.status)
            return;

        this.status = state.status;

        if (this.status === statuses.PENDING) {
            const source_id = state.source_id;

            if (source_id === this.source_id) {
                this.status = statuses.SUCCESS;
                store.dispatch({type: actions.news.LOAD_NEWS_SKIPPED});
                return;
            }

            fetch(`https://newsapi.org/v2/top-headlines?sources=${source_id}&apiKey=${apikey}`, {
                mode: 'cors',
                method: 'GET'
            })
                .then(response => response.json(),
                    err => store.dispatch({type: actions.errors.LOAD_NEWS_ERROR, message: err}))
                .then((data) => {
                    let articles_div = document.getElementById('articles');

                    articles_div.innerHTML = '';

                    for (let article of data.articles) {
                        article = new Article(article);

                        article.convertLang(EnNewsConverter);
                        article.convertLang(RuNewsConverter);
                        article.convertLang(CaNewsConverter);

                        articles_div.appendChild(article.getHtmlElement());
                    }

                    this.status = statuses.SUCCESS;
                    store.dispatch({type: actions.news.LOAD_NEWS_COMPLETED, data: data.articles})
                });
        }
    }

    show_error() {
        const error = store.getState().error;

        if (error)
            this.div.innerHTML = `<div id="info-message">${error}</div>`;
    }
}
