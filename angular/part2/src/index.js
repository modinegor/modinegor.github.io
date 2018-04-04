import 'angular';
import 'angular-route';
import 'angular-resource';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import resource from './resources'
import {blogController} from "./controllers";
import {articleContainer, pageIndicators} from "./components";
import {articleController} from "./controllers/edit";
import {articleForm, textLength} from "./directives";
import {articlesResource} from "./resources/blog";


const app = angular.module('blogApp', ['ngRoute', 'ngResource']);

app.directive('textLength', textLength);
app.directive('articleForm', articleForm);

app.factory('articlesResource', ['$resource', articlesResource]);

app.controller('blogController', ['$location', 'articlesResource', blogController]);
app.controller('articleController', ['$scope', '$route', '$location', 'articlesResource', articleController]);

app.component('articleContainer', articleContainer);
app.component('pageIndicators', pageIndicators);

app.config(['$routeProvider', routes]);
app.config(['$resourceProvider', resource]);
