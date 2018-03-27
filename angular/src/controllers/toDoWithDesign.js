const toDoWithDesign = ($scope, toDoFactory) => {
    $scope.tasks = toDoFactory.getTasks();
    $scope.newTask = '';
    $scope.filter = {
        all: true,
        active: false,
        completed: false
    };

    $scope.addTask = () => {
        toDoFactory.addTask($scope.newTask, null);
        $scope.newTask = '';
    };

    $scope.removeTask = task => {
        toDoFactory.removeTask(task);
    };

    $scope.toggleTask = task => {
        toDoFactory.toggleTask(task);
    };

    $scope.removeAllCompleted = () => {
        toDoFactory.removeAllCompleted();
        $scope.tasks = toDoFactory.getTasks();
    };

    $scope.selectAll = () => {
        $scope.filter = {
            all: true,
            active: false,
            completed: false
        };
    };

    $scope.selectActive = () => {
        $scope.filter = {
            all: false,
            active: true,
            completed: false
        };
    };

    $scope.selectCompleted = () => {
        $scope.filter = {
            all: false,
            active: false,
            completed: true
        };
    };
};

export default toDoWithDesign;
