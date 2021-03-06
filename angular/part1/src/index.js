import 'angular';
import 'angular-route';
import 'angular-resource';
import 'bootstrap/dist/css/bootstrap.css';
import routes from "./routes";
import resource from './resources'
import {toDoFactory} from "./factories";
import {ngEnter} from './directives';
import {stateFilter, daysFilter, toDoSorting} from "./filters";
import {toDoWithDesign, toDoController, navController} from "./controllers";
import {addToDo, editToDo} from "./controllers/admin";


const app = angular.module('toDoApp', ['ngRoute', 'ngResource']);

app.directive('ngEnter', ngEnter);

app.factory('toDoFactory', ['$resource', toDoFactory]);

app.controller('navController', ['$scope', navController]);
app.controller('toDoWithDesign', ['$scope', 'toDoFactory', toDoWithDesign]);
app.controller('toDoController', ['$scope', 'toDoFactory', toDoController]);
app.controller('addToDo', ['$scope', '$location', 'toDoFactory', addToDo]);
app.controller('editToDo', ['$scope', '$route', '$location', 'toDoFactory', editToDo]);

app.config(['$routeProvider', routes]);
app.config(['$resourceProvider', resource]);

app.filter('state', stateFilter);
app.filter('days', daysFilter);
app.filter('sort', toDoSorting);
