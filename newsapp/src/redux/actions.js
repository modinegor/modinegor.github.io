const actions = {
    news: {
        GET_SOURCE_NEWS:     'GET_SOURCE_NEWS',
        LOAD_NEWS_COMPLETED: 'LOAD_NEWS_COMPLETED',
        LOAD_NEWS_SKIPPED:   'LOAD_NEWS_SKIP'
    },
    sources: {
        GET_SOURCES_LIST:       'GET_SOURCES_LIST',
        LOAD_SOURCES_COMPLETED: 'LOAD_SOURCES_COMPLETED',
        SCROLL_SOURCES_UP:      'SCROLL_SOURCES_UP',
        SCROLL_SOURCES_DOWN:    'SCROLL_SOURCES_DOWN',
    },
    errors: {
        COMMON_ERROR:       'COMMON_ERROR',
        LOAD_SOURCES_ERROR: 'LOAD_SOURCES_ERROR',
        LOAD_NEWS_ERROR:    'LOAD_NEWS_ERROR'
    }
};

export default actions;
