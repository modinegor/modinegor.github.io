describe('textLength', () => {
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
            text: ''
        };

        // $httpBackend.expectGET('/views/part2/components/articleForm.html').respond({});
        $httpBackend.expectGET('/views/part2/blog.html').respond({});

        element = `<form name="form">
                        <input name="articleText" ng-model="article.text" text-length />
                   </form>`;
        element = $compile(element)($scope);

        $httpBackend.flush();

        $scope.$digest();
    }));

    it('length is 0', () => {
        $scope.form.articleText.$setViewValue('');
        expect($scope.form.$valid).toBe(false);
    });

    it('length less than 20', () => {
        $scope.form.articleText.$setViewValue('0'.repeat(10));
        expect($scope.form.$valid).toBe(false);
    });

    it('length less than 20 by 1', () => {
        $scope.form.articleText.$setViewValue('0'.repeat(19));
        expect($scope.form.$valid).toBe(false);
    });

    it('length equal to 20', () => {
        $scope.form.articleText.$setViewValue('0'.repeat(20));
        expect($scope.form.$valid).toBe(true);
    });

    it('length greater than 20 by 1', () => {
        $scope.form.articleText.$setViewValue('0'.repeat(21));
        expect($scope.form.$valid).toBe(true);
    });

    it('length greater than 20', () => {
        $scope.form.articleText.$setViewValue('0'.repeat(30));
        expect($scope.form.$valid).toBe(true);
    });
});
