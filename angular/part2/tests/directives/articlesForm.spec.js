describe('articleForm', () => {
    let $compile,
        $scope, isolateScope,
        element,
        $httpBackend;

    beforeEach(module('blogApp'));

    beforeEach(inject((_$compile_, _$rootScope_, _$httpBackend_) => {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        $scope.article = {
            title: 'test article title',
            text: 'text article text'
        };
        $scope.saveArticle = jasmine.createSpy('saveArticle');

        $httpBackend.expectGET('/views/part2/components/articleForm.html').respond({});
        $httpBackend.expectGET('/views/part2/blog.html').respond({});

        element = '<article-form button-name="save" article="article" on-save="saveArticle()"></article-form>';
        element = $compile(element)($scope);

        $httpBackend.flush();

        $scope.$digest();
        isolateScope = element.isolateScope();
    }));

    it('submit', () => {
        isolateScope.save();
        expect($scope.saveArticle).toHaveBeenCalled();
    });

    it('article value of scope', () => {
        expect($scope.article).toEqual(isolateScope.article);
    })
});