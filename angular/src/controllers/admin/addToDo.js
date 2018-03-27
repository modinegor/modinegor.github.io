const addToDo = ($scope, toDoFactory) => {
    $scope.editTitle = '';
    $scope.editText = '';
    $scope.buttonName = 'Create';

    $scope.saveToDo = () => {
        toDoFactory.addTask($scope.editTitle, $scope.editText);
        if ($scope.editTitle !== '' && $scope.editText.length >= 20) {
            $scope.editTitle = '';
            $scope.editText = '';
            window.location.href = '#!/todo';
        }
    }
};

export default addToDo;
