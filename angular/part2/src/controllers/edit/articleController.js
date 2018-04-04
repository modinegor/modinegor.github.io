const articleController = ($scope, $route, $location, articlesFactory) => {
    const params = $route.current.params;

    $scope.article = {
        title: '',
        text: ''
    };

    if (params.id !== undefined) {
        let article = articlesFactory.getArticles()[params.id - 1];

        $scope.article.title = article.title;
        $scope.article.text = article.text;
    }

    $scope.saveArticle = () => {
        if ($scope.article.title && $scope.article.text) {
            articlesFactory.changeArticle(params.id - 1, $scope.article.title, $scope.article.text);
            $location.path('/blog').replace();
        }
    };

    $scope.addArticle = () => {
        if($scope.article.text && $scope.article.title) {
            articlesFactory.setCurrent(
                articlesFactory.addArticle($scope.article.title, $scope.article.text));

            $location.path('/blog').replace();
        }
    };
};

export default articleController;
