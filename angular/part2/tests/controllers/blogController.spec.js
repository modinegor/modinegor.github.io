describe('blogController', () => {
    let $controller,
        blogController,
        articlesFactory,
        deferred,
        $rootScope;

    beforeEach(module('blogApp'));

    beforeEach(inject((_$controller_, _articlesFactory_, _$q_, _$rootScope_) => {
        $controller = _$controller_;
        articlesFactory = _articlesFactory_;

        deferred = _$q_.defer();

        $rootScope = _$rootScope_.$new();

        spyOn(articlesFactory, 'getArticles').and.returnValue(deferred.promise);
        spyOn(articlesFactory, 'getCurrent').and.callFake((id=1) => id);
        spyOn(articlesFactory, 'setCurrent').and.callFake(id => id);
        spyOn(articlesFactory, 'addArticle').and.callFake(() => null);
    }));

    it('should be defined', () => {
        deferred.resolve([]);

        blogController = $controller('blogController', {articlesFactory: articlesFactory});
        $rootScope.$digest();

        expect(blogController).toBeDefined();
        expect(blogController.page).toBeDefined();
        expect(blogController.article).toBeDefined();
        expect(blogController.showNext).toBeDefined();
        expect(blogController.showPrev).toBeDefined();
    });

    describe('articles is not defined', () => {
        beforeEach(() => {
            deferred.resolve([]);

            blogController = $controller('blogController', {articlesFactory: articlesFactory});
            $rootScope.$digest();
        });

        it('default page is not defined', () => {
            expect(blogController.page.current).toBeDefined();
            expect(blogController.page.length).toBeDefined();

            expect(blogController.page.current).toEqual(0);
            expect(blogController.page.length).toEqual(0);
        });

        it('default article is not defined', () => {
            expect(blogController.article.title).toBeUndefined();
            expect(blogController.article.text).toBeUndefined();
        });
    });

    describe('articlesFactory has stored articles', () => {
        let articlesList = [
            {title: 'first articles', text: 'some text of first article'},
            {title: 'second articles', text: 'some text of second article'},
            {title: 'third articles', text: 'some text of third article'},
        ];

        beforeEach(() => {
            deferred.resolve(articlesList);

            blogController = $controller('blogController', {articlesFactory: articlesFactory});
            $rootScope.$digest();
        });

        it('default page is the first page', () => {
            expect(blogController.page.current).toEqual(1);
            expect(blogController.page.length).toEqual(articlesList.length);
        });

        it('default article is the first article', () => {
            expect(blogController.article.title).toBe(articlesList[0].title);
            expect(blogController.article.text).toBe(articlesList[0].text);
        });

        describe('navigation through articles', () => {
            it('move forward', () => {
                blogController.showNext();

                expect(blogController.page).toEqual({current: 2, length: articlesList.length});
                expect(blogController.article).toEqual(articlesList[1]);
            });

            it('move backward', () => {
                blogController.page.current = 2;
                blogController.showPrev();

                expect(blogController.page).toEqual({current: 1, length: articlesList.length});
                expect(blogController.article).toEqual(articlesList[0]);
            });
        });
    });
});
