import {apikey} from "../helpers/const";
import {Error} from "../errors";
import {EnNewsConverter} from "../models/visitors/newsVisitors/EnNewsVisitor";
import {RuNewsConverter} from "../models/visitors/newsVisitors/RuNewsVisitor";
import {CaNewsConverter} from "../models/visitors/newsVisitors/CaNewsVisitor";
import Article from "./article";
import store from "../redux/store";


const render = () => {
    const state = store.getState();
    const source_id = state.sources.source_id;

    fetch(`https://newsapi.org/v2/top-headlines?sources=${source_id}&apiKey=${apikey}`, {mode: 'cors', method: 'GET'})
        .then(response => response.json(),
            err => Error.show(`Error: ${err}`))
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
        });
};
