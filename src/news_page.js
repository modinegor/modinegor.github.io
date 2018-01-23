import SourceBox from "./sources/sourcesBox";
import NewsBox from "./news/newsBox";
import actions from "./redux/actions";
import createStore from "./redux/store";


export const initPage = () => {
    const store = new createStore();
    const sourceBox = new SourceBox();
    const newsBox = new NewsBox();

    store.subscribe(() => newsBox.show_error());
    store.subscribe(() => newsBox.show());

    store.subscribe(() => sourceBox.show());
    store.subscribe(() => sourceBox.change());

    store.dispatch({type: actions.sources.GET_SOURCES_LIST});

    document.getElementById('scroll-up').addEventListener('click', () => store.dispatch({
        type: actions.sources.SCROLL_SOURCES_UP
    }));
    document.getElementById('scroll-down').addEventListener('click', () => store.dispatch({
        type: actions.sources.SCROLL_SOURCES_DOWN
    }));
};
