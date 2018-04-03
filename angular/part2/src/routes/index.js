const routes = $routeProvider => {
    $routeProvider
        .when('/blog', {
            templateUrl: '/views/part2/blog.html',
            controller: 'blogController',
            controllerAs: 'blog'
        })
        .when('/blog/admin/create', {
            templateUrl: '/views/part2/edit.html',
            controller: 'createArticle'
        })
        .when('/blog/admin/:id/edit', {
            templateUrl: '/views/part2/edit.html',
            controller: 'editArticle'
        })
        .otherwise({redirectTo: '/blog'})
};

export default routes;
