const blogResources = $resource => {
    return {
        get: () => {
            let articles = [];
            $resource('/api/blog').query(data => {
                for (let item of data) {
                    let {title, text} = item;

                    articles.push({title, text});
                }
            });

            return articles;
        },
        post: (title, text, id=null) => {
            let url = '/api/blog';

            if (id !== null)
                url += `/${id}`;

            $resource(url).save({title, text});
        },
        articles: () => {
            return articles;
        }
    }
};

export default blogResources;
