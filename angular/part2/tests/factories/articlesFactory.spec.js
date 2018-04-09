describe('articlesFactory', () => {
    let articlesFactory,
        articlesList = [
            {title: 'first articles', text: 'some text of first article'},
            {title: 'second articles', text: 'some text of second article'},
            {title: 'third articles', text: 'some text of third article'},
        ],
        blogResourcesMock = {
            get: jasmine.createSpy('get').and.returnValue(articlesList),
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

    it('should request articles from blogResources', () => {
        expect(blogResourcesMock.get).toHaveBeenCalled();
    });

    describe('methods', () => {
        it('getArticles', () => {
            expect(articlesFactory.getArticles()).toBe(articlesList);
        });

        it('addArticle', () => {
            let title = 'new article title',
                text = 'new article text';

            articlesFactory.addArticle(title, text);

            let articles = articlesFactory.getArticles();

            expect(blogResourcesMock.post).toHaveBeenCalledWith(title, text);
            expect({title, text}).toEqual(articles[articles.length - 1]);
        });

        it('changeArticle', () => {
            let title = 'changed article title',
                text = 'changed article text',
                article1 = {...articlesList[0]},
                article3 = {...articlesList[2]};

            articlesFactory.changeArticle(1, title, text);

            let articles = articlesFactory.getArticles();

            expect(blogResourcesMock.post).toHaveBeenCalledWith(title, text, 1);
            expect({title, text}).toEqual(articles[1]);
            expect(article1).toEqual(articles[0]);
            expect(article3).toEqual(articles[2]);
        });

        it('getCurrent', () => {
            expect(articlesFactory.getCurrent()).toEqual(1);
        });

        describe('setCurrent', () => {
            it('new current is within the list', () => {
                let new_current = 2;

                expect(articlesFactory.setCurrent(new_current)).toEqual(new_current);
                expect(articlesFactory.getCurrent()).toEqual(new_current);
            });

            it('move through left edge', () => {
                expect(articlesFactory.setCurrent(0)).toEqual(articlesList.length);
                expect(articlesFactory.getCurrent()).toEqual(articlesList.length);
            });

            it('move through right edge', () => {
                expect(articlesFactory.setCurrent(articlesList.length + 1)).toEqual(1);
                expect(articlesFactory.getCurrent()).toEqual(1);
            });
        });
    });
});
