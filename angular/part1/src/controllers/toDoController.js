const toDoController = ($scope, toDoFactory) => {
    $scope.tasks = toDoFactory.getTasks();

    $scope.sortA = {field: null, order: null};
    $scope.sortC = {field: null, order: null};

    $scope.maxDays = 0;

    $scope.removeToDo = task => {
        toDoFactory.removeTask(task);
    };

    $scope.changeState = task => {
        toDoFactory.toggleTask(task);
    };

    $scope.sortToDo = (listName, sortBy) => {
        switch (listName) {
            case 'active':
                $scope.sortA = {
                    field: sortBy,
                    order: $scope.sortA.field === sortBy ? ! $scope.sortA.order : true
                };
                break;
            case 'completed':
                $scope.sortC = {
                    field: sortBy,
                    order: $scope.sortC.field === sortBy ? ! $scope.sortC.order : true
                };
                break;
        }
    };
};

export default toDoController;
