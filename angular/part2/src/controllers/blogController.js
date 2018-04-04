export default function blogController($location, articlesFactory) {
    let articles = articlesFactory.getArticles(),
        current = articlesFactory.getCurrent();

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

    this.showNext = () => {
        this.page.current = articlesFactory.setCurrent(this.page.current + 1);
        this.article = articles[this.page.current - 1];
    };

    this.showPrev = () => {
        this.page.current = articlesFactory.setCurrent(this.page.current - 1);
        this.article = articles[this.page.current - 1];
    };

    this.editArticle = () => {
        $location.path(`/blog/admin/${this.page.current}/edit`)
    };
};
