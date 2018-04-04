const articlesResource = $resource => {
    let articles = [];

    $resource('/api/blog').query(data => {
        for (let item of data) {
            let {title, text} = item;

            articles.push({title, text});
        }
    });

    let current = 1;

    return {
        getArticles: () => {
            return articles;
        },
        addArticle: (title, text) => {
            articles.push({title, text});
            $resource('/api/blog').save({title, text});

            return articles.length;
        },
        changeArticle(id, title, text) {
            articles[id].title = title;
            articles[id].text = text;

            $resource(`/api/blog/${id}`).save({title, text});
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

export default articlesResource;
