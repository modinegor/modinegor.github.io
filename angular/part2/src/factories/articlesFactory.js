const articlesFactory = blogResources => {
    let articles = blogResources.get(),
        current = 1;

    return {
        getArticles: () => {
            return articles;
        },
        addArticle: (title, text) => {
            articles.push({title, text});
            blogResources.post(title, text);

            return articles.length;
        },
        changeArticle(id, title, text) {
            articles[id].title = title;
            articles[id].text = text;

            blogResources.post(title, text, id);
        },
        getCurrent() {
            return current;
        },
        setCurrent(id) {
            if (id === articles.length + 1)
                id = 1;
            if (id === 0)
                id = articles.length;

            current = id;
            return id;
        }
    };
};

export default articlesFactory;
