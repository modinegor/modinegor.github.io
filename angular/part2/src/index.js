import 'angular';
import 'angular-route';
import 'angular-resource';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import resource from './resources'
import {blogController} from "./controllers";
import {articleContainer, pageIndicators} from "./components";
import {articlesFactory} from "./factories";
import {editArticle, createArticle} from "./controllers/edit";
import {textLength} from "./directives";


const app = angular.module('blogApp', ['ngRoute', 'ngResource']);

app.directive('textLength', textLength);

app.factory('articlesFactory', ['$resource', articlesFactory]);

app.controller('blogController', ['$location', 'articlesFactory', blogController]);
app.controller('editArticle', ['$scope', '$route', '$location', 'articlesFactory', editArticle]);
app.controller('createArticle', ['$scope', '$location', 'articlesFactory', createArticle]);

app.component('articleContainer', articleContainer);
app.component('pageIndicators', pageIndicators);

app.config(['$routeProvider', routes]);
app.config(['$resourceProvider', resource]);
