const routes = $routeProvider => {
    $routeProvider
        .when('/todo', {
            templateUrl: '/views/part1/todo.html',
            controller: 'toDoController'
        })
        .when('/pretty', {
            templateUrl: '/views/part1/pretty.html',
            controller: 'toDoWithDesign'
        })
        .when('/todo/admin/create', {
            templateUrl: '/views/part1/admin/edit.html',
            controller: 'addToDo'
        })
        .when('/todo/admin/:id/edit', {
            templateUrl: '/views/part1/admin/edit.html',
            controller: 'editToDo'
        })
        .otherwise({redirectTo: '/todo'})
};

export default routes;
