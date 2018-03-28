const addToDo = ($scope, $location, toDoFactory) => {
    $scope.editTitle = '';
    $scope.editText = '';
    $scope.buttonName = 'Create';

    $scope.saveToDo = () => {
        if ($scope.editTitle !== '' && $scope.editText.length >= 20) {
            toDoFactory.addTask($scope.editTitle, $scope.editText);
            $scope.editTitle = '';
            $scope.editText = '';
            $location.path('/todo').replace();
        }
    }
};

export default addToDo;
