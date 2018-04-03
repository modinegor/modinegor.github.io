const editArticle = ($scope, $route, $location, articlesFactory) => {
    const params = $route.current.params;

    let article = articlesFactory.getArticles()[params.id - 1];

    $scope.editTitle = article.title;
    $scope.editText = article.text;
    $scope.buttonName = 'Save';

    $scope.saveArticle = () => {
        if ($scope.editTitle && $scope.editText) {
            articlesFactory.changeArticle(params.id - 1, $scope.editTitle, $scope.editText);
            $location.path('/blog').replace();
        }
    };
};

export default editArticle;
