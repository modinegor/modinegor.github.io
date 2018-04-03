const editToDo = ($scope, $route, $location, toDoFactory) => {
    const params = $route.current.params;

    let tasks = toDoFactory.getTasks(),
        task = tasks.filter(item => item.id == params.id)[0];

    $scope.editTitle = task.title;
    $scope.editText = task.text;
    $scope.buttonName = 'Save';

    $scope.saveToDo = () => {
        if ($scope.editTitle && $scope.editText) {
            toDoFactory.changeTask(task, $scope.editTitle, $scope.editText);
            $location.path('/todo').replace();
        }
    };
};

export default editToDo;
