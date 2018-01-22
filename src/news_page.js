import SourceBox from "./sources/render";
import NewsBox from "./news/render";
import store from "./redux/store";
import actions from "./redux/actions";


export const initPage = () => {
    const sourceBox = new SourceBox();
    const newsBox = new NewsBox();

    store.subscribe(() => newsBox.show_error());
    store.subscribe(() => newsBox.show());

    store.subscribe(() => sourceBox.show());
    store.subscribe(() => sourceBox.change());

    store.dispatch({type: actions.errors.COMMON_ERROR, message: "Choose source to see the news"});
    store.dispatch({type: actions.sources.GET_SOURCES_LIST});

    document.getElementById('scroll-up').addEventListener('click', () => store.dispatch({
        type: actions.sources.SCROLL_SOURCES_UP
    }));
    document.getElementById('scroll-down').addEventListener('click', () => store.dispatch({
        type: actions.sources.SCROLL_SOURCES_DOWN
    }));
};
