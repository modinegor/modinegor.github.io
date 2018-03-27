const editToDo = ($scope, $route, toDoFactory) => {
    const params = $route.current.params;

    let tasks = toDoFactory.getTasks(),
        task = tasks.filter(item => item.id == params.id)[0];

    $scope.editTitle = task.title;
    $scope.editText = task.text;
    $scope.buttonName = 'Save';

    $scope.saveToDo = () => {
        if ($scope.editTitle && $scope.editText.length >= 20) {
            toDoFactory.changeTask(task, $scope.editTitle, $scope.editText);
            window.location.href = '#!/todo';
        }
    };
};

export default editToDo;
