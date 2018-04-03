const createArticle = ($scope, $location, articlesFactory) => {
    $scope.editTitle = '';
    $scope.editText = '';
    $scope.buttonName = 'create';

    $scope.saveArticle = () => {
        if($scope.editText && $scope.editTitle) {
            articlesFactory.setCurrent(
                articlesFactory.addArticle($scope.editTitle, $scope.editText));

            $location.path('/blog').replace();
        }
    };
};

export default createArticle;
