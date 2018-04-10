describe('articlesFactory', () => {
    let articlesFactory,
        articlesMockObject = {},
        blogResourcesMock = {
            get: jasmine.createSpy('get').and.returnValue(articlesMockObject),
            post: jasmine.createSpy('post')
        };

    beforeEach(module('blogApp', $provide => {
        $provide.factory('blogResources', () => blogResourcesMock)
    }));

    beforeEach(inject(_articlesFactory_ => {
        articlesFactory = _articlesFactory_;
    }));

    it('should exist and define all methods', () => {
        expect(articlesFactory).toBeDefined();

        expect(articlesFactory.getArticles).toBeDefined();
        expect(articlesFactory.addArticle).toBeDefined();
        expect(articlesFactory.changeArticle).toBeDefined();
        expect(articlesFactory.getCurrent).toBeDefined();
        expect(articlesFactory.setCurrent).toBeDefined();
    });

    describe('methods', () => {
        it('getArticles', () => {
            expect(articlesFactory.getArticles()).toBe(articlesMockObject);
            expect(blogResourcesMock.get).toHaveBeenCalled();
            expect(articlesFactory.getArticles()).not.toBe(articlesMockObject);
            expect(blogResourcesMock.get).toHaveBeenCalledTimes(1);
        });

        it('addArticle', () => {
            articlesFactory.getArticles();

            let title = 'first article title',
                text = 'first article text';

            articlesFactory.addArticle(title, text);

            let articles = articlesFactory.getArticles();

            expect(blogResourcesMock.post).toHaveBeenCalledWith(title, text);
            expect({title, text}).toEqual(articles[articles.length - 1]);
        });

        it('changeArticle', () => {
            articlesFactory.getArticles();

            let title = 'first article title',
                text = 'first article text';

            articlesFactory.addArticle(title, text);

            title += ' changed';
            text += ' changed';

            articlesFactory.changeArticle(0, title, text);

            expect(blogResourcesMock.post).toHaveBeenCalledWith(title, text, 0);

            let articles = articlesFactory.getArticles();

            expect({title, text}).toEqual(articles[0]);
        });

        it('getCurrent', () => {
            expect(articlesFactory.getCurrent()).toEqual(1);
        });

        describe('setCurrent', () => {
            beforeEach(() => {
                articlesFactory.addArticle('first article title', 'first article text');
                articlesFactory.addArticle('second article title', 'second article text');
                articlesFactory.addArticle('third article title', 'third article text');
            });

            it('new current is within the list', () => {
                let new_current = 2;

                expect(articlesFactory.setCurrent(new_current)).toEqual(new_current);
                expect(articlesFactory.getCurrent()).toEqual(new_current);
            });

            it('move through left edge', () => {
                expect(articlesFactory.setCurrent(0)).toEqual(3);
                expect(articlesFactory.getCurrent()).toEqual(3);
            });

            it('move through right edge', () => {
                expect(articlesFactory.setCurrent(4)).toEqual(1);
                expect(articlesFactory.getCurrent()).toEqual(1);
            });
        });
    });
});
