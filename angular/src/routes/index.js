const routes = $routeProvider => {
    $routeProvider
        .when('/', {
            templateUrl: '/views/todo.html',
            controller: 'toDoController'
        })
        .when('/todo', {
            templateUrl: '/views/todo.html',
            controller: 'toDoController'
        })
        .when('/pretty', {
            templateUrl: '/views/pretty.html',
            controller: 'toDoWithDesign'
        })
        .when('/todo/admin/create', {
            templateUrl: '/views/admin/edit.html',
            controller: 'addToDo'
        })
        .when('/todo/admin/:id/edit', {
            templateUrl: '/views/admin/edit.html',
            controller: 'editToDo'
        })
        .otherwise({redirectTo: '/todo'})
};

export default routes