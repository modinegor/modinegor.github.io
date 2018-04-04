const routes = $routeProvider => {
    $routeProvider
        .when('/blog', {
            templateUrl: '/views/part2/blog.html',
            controller: 'blogController',
            controllerAs: 'blog'
        })
        .when('/blog/admin/create', {
            templateUrl: '/views/part2/admin/add.html',
            controller: 'articleController'
        })
        .when('/blog/admin/:id/edit', {
            templateUrl: '/views/part2/admin/edit.html',
            controller: 'articleController'
        })
        .otherwise({redirectTo: '/blog'})
};

export default routes;
