import actions from "../redux/actions";
import statuses from "./statuses";
import {deepCopy} from "../helpers/helpers";


const defaultState = {
    news: {
        status: statuses.INIT,
        source_id: undefined,
        data: []
    },
    sources: {
        status: statuses.INIT,
        filter: {},
        data: [],
        shown: []
    },
    error: null
};

const reducer = (state = defaultState, action) => {
    let new_state = {news: {...state.news, data: [...state.news.data]},
                     sources: {...state.sources, filter: {...state.sources.filter}, data: [...state.sources.data]},
                     error: null};

    if (!action)
        return new_state;

    switch (action.type) {
        case actions.errors.COMMON_ERROR:
            new_state.error = action.message;
            break;
        case actions.errors.LOAD_NEWS_ERROR:
            new_state.error = action.message;
            new_state.news.status = statuses.ERROR;
            break;
        case actions.errors.LOAD_SOURCES_ERROR:
            new_state.error = action.message;
            new_state.sources.status = statuses.ERROR;
            break;
        case actions.sources.GET_SOURCES_LIST:
            new_state.sources.status = statuses.PENDING;
            if (action.filter)
                new_state.sources.filter = {...new_state.sources.filter, ...action.filter};
            break;
        case actions.sources.LOAD_SOURCES_COMPLETED:
            new_state.sources.status = statuses.SUCCESS;
            new_state.sources.data = [...action.data];
            new_state.sources.shown = [...action.shown];
            break;
        case actions.sources.SCROLL_SOURCES_UP:
            if (new_state.sources.shown && new_state.sources.shown[0] === 0)
                break;
            new_state.sources.shown = [new_state.sources.shown[0] - 1, ...new_state.sources.shown.slice(0, -1)];
            break;
        case actions.sources.SCROLL_SOURCES_DOWN:
            let shown = new_state.sources.shown;
            if (shown && shown[shown.length - 1] === new_state.sources.data.length - 1)
                break;
            new_state.sources.shown = [...shown.slice(1), shown[shown.length - 1] + 1];
            break;
        case actions.news.GET_SOURCE_NEWS:
            new_state.news.status = statuses.PENDING;
            new_state.news.source_id = action.source_id;
            break;
        case actions.news.LOAD_NEWS_COMPLETED:
            new_state.news.data = action.data;
        case actions.news.LOAD_NEWS_SKIPPED:
            new_state.news.status = statuses.SUCCESS;
            break;
        default:
            break;
    }

    return new_state;
};

export default reducer;
