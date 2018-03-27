const navController = $scope => {
    $scope.show = false;
    $scope.active = {
        home: true,
        pretty: false,
        admin: false
    };

    $scope.showDropdown = () => {
        $scope.show = !$scope.show;
    };

    $scope.changeMenu = item => {
        $scope.active = {
            home: false,
            pretty: false,
            admin: false
        };

        switch (item) {
            case 'admin':
                $scope.active.admin = true;
                break;
            case 'home':
                $scope.active.home = true;
                break;
            case 'pretty':
                $scope.active.pretty = true;
                break;
        }

        $scope.show = false;
    };
};

export default navController;
