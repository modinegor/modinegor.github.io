import 'angular';
import 'angular-route';
import 'angular-resource';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import {resource, blogResources} from './resources'
import {blogController} from "./controllers";
import {articleContainer, pageIndicators} from "./components";
import {articleController} from "./controllers/edit";
import {articleForm, textLength} from "./directives";
import {articlesFactory} from "./factories";


const app = angular.module('blogApp', ['ngRoute', 'ngResource']);

app.directive('textLength', textLength);
app.directive('articleForm', articleForm);

app.factory('blogResources', ['$resource', blogResources]);
app.factory('articlesFactory', ['blogResources', articlesFactory]);

app.controller('blogController', ['articlesFactory', blogController]);
app.controller('articleController', ['$scope', '$route', '$location', 'articlesFactory', articleController]);

app.component('articleContainer', articleContainer);
app.component('pageIndicators', pageIndicators);

app.config(['$routeProvider', routes]);
app.config(['$resourceProvider', resource]);
