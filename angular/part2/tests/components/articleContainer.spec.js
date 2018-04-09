describe('articleContainer', () => {
    let $compile,
        $scope,
        element = '<article-form button-name="create" article="article" on-save="addArticle()"></article-form>';

    beforeEach(module('blogApp'));

    beforeEach(inject((_$compile_, _$componentController_) => {
        $compile = _$compile_;
        $scope = {};


    }))
});
