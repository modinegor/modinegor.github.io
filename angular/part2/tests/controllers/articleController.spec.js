describe('articleController', () => {
    let $controller,
        articlesFactory,
        $location,
        $route,
        $scope,
        articleController,
        articlesList = [
            {title: 'first articles', text: 'some text of first article'},
            {title: 'second articles', text: 'some text of second article'},
            {title: 'third articles', text: 'some text of third article'},
        ],
        id = 2;

    beforeEach(module('blogApp'));

    beforeEach(inject((_$controller_, _$location_, _$route_, _articlesFactory_) => {
        $controller = _$controller_;
        $scope = {};
        $location = _$location_;
        $route = _$route_;
        articlesFactory = _articlesFactory_;

        $route.current = {params: {id: id}};
        spyOn(articlesFactory, 'getArticles').and.returnValue(articlesList);
        spyOn(articlesFactory, 'setCurrent').and.callThrough();
        spyOn(articlesFactory, 'addArticle').and.callFake(() => {});
        spyOn(articlesFactory, 'changeArticle').and.callFake(() => {});

        articleController = $controller('articleController', {
            $scope: $scope,
            $location: $location,
            $route: $route,
            articlesFactory: articlesFactory
        });

    }));

    it('should be defined', () => {
        expect(articleController).toBeDefined();
    });

    it('methods are defined', () => {
        expect($scope.saveArticle).toBeDefined();
        expect($scope.addArticle).toBeDefined();
    });

    it('article correspond to id', () => {
        expect($scope.article.title).toEqual(articlesList[1].title);
        expect($scope.article.text).toEqual(articlesList[1].text);
    });

    describe('location', () => {
        beforeEach(() => {
            spyOn($location, 'path').and.returnValue({replace: () => {}});
        });

        it('saveArticle', () => {
            $scope.saveArticle();

            expect($location.path).toHaveBeenCalledWith('/blog')
        });

        it('saveArticle', () => {
            $scope.addArticle();

            expect($location.path).toHaveBeenCalledWith('/blog')
        });
    });
});
