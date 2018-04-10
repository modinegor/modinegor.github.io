export default function blogController(articlesFactory) {
    let articles = [];

    articlesFactory.getArticles().then(data => {
        articles = data;

        for (let article of articles) {
            let {title, text} = article;
            articlesFactory.addArticle(title, text);
        }

        this.page = {
            current: 0,
            length: 0
        };
        this.article = {
            title: undefined,
            text: undefined
        };

        if (articles.length !== 0) {
            this.page.current = articlesFactory.getCurrent(1);
            this.page.length = articles.length;

            this.article = articles[this.page.current - 1];
        }
    });


    this.showNext = () => {
        this.page.current = articlesFactory.setCurrent(this.page.current + 1);
        this.article = articles[this.page.current - 1];
    };

    this.showPrev = () => {
        this.page.current = articlesFactory.setCurrent(this.page.current - 1);
        this.article = articles[this.page.current - 1];
    };
};
