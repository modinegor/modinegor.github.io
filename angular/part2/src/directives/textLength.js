const textLength = () => {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: (scope, elm, attrs, ctrl) => {
            ctrl.$validators.textLength = (modelValue, viewValue) => {
                return viewValue.length >= 20;
            };
        }
    }
};

export default textLength;
