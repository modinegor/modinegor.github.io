const articleForm = () => {
    return {
        require: 'ngModel',
        restrict: 'E',
        templateUrl: '/views/part2/components/articleForm.html',
        scope: {
            buttonName: '@',
            save: '&onSave',
            article: '=article'
        }
    }
};

export default articleForm;
