# Frontcamp 3

## Hometasks:

### ES2015

1. Go to https://newsapi.org/
2. Press ‘Get Api Key’ on the right
3. Enter your desired creds and promise to add an attribution link to newsapi
4. Press submit and store your API key - this one will be used for api requests
5. Test you did well - https://newsapi.org/v1/articles?source={{CHANEL_CODE}}&apiKey={{YOUR_API_KEY}}
6. Create application, using your github page on your github account: https://pages.github.com/
7. Using es6 knowledge create an application that uses newsapi, which will run purely on the client-side in Chrome-54 browser (no server-side work expected).
8. Your app should provide the user possibility to select some news channel where he wants to get news. Get all the news from certain channel and display them;
9. Score points for every usage of the es6, but points will be descored for prehistoric things (such as XMLHttpRequest);
10. Styling is not the requirement for this task, but it will be an additional bonus;
11. You're not allowed to use any framework
12. Add attribution link, remember, you promised!

### Babel

For 3 stars:
Use babel for your solution from week1.

For 4 stars:
Make everything run inside IE10
Please, find virtual machine with installed IE10 for your OS here:
https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/windows/?utm_source=SitePoint
You're neither allowed to use babel in the browser, nor to do the compilation step by hands via repl (or it will be 2 star max, so the task will be considered as failed)

For 5 stars:
Write a babel plugin. Please, negotiate with your mentor what exactly will you do; you're free to do anything (if this anything is approved by him :)
You can use https://github.com/RReverser/babel-plugin-hello-world as a starting point.

### Webpack

Improve your application for Webpack:
(1-3) stars
- Use Babel as a loader.
- Use style and url loaders. (Sass/less/stylus, autoprefixer optional)
- Each part of logic should be in a separate file. (ES6 modules)
- Use plugins
- Configure the bundler for development and production mode.
- Configure Webpack-dev-server

(4-5) stars
- AMD :
create button "Show News" on the main page.
your app should load necessary code(css, js) for rendering newsList only after clicking on the button above.

- custom loader
loader should be chainable
applicable for /\.json/
remove all number attributes in source

### Design patterns

5 stars => All for 3 stars!!!!! + Implement architectural pattern Flux (Redux implementation) in the app;

4 stars => All for 3 stars + Implement architectural pattern MV* on your choice in the app

3 stars => All for 2 stars + Implement two behavioral patterns;

2 stars => All for 1 star + Implement two structural patterns;

1 star => Implement two creational patterns;

### Node.js

Implement blog system web-server based on Node.js + express framework.  *To get max point 5 implement advanced part.

Part 1:
1.	Install NodeJS. Use npm to install express framework to your project folder.
2.	Implement and run simple web-server which will always (any route, any request) return JSON of fixed blog article object.
3.	Extend web-server functionality from #2. Use Rest API to implement CRUD operations endpoints for blog articles. You can log to console all operations until part 2. Use postman, or fiddler or other tool to test your endpoints.
Example of routes:
•	GET    /blogs
•	GET    /blogs/{id}
•	POST   /blogs
•	PUT    /blogs/{id}
•	DELETE /blogs/{id}
4.	Use any express view engine to return welcome page to user when accessing any route that server doesn’t understand/not configured. This will replace implementation from #2.

*Advanced:
Use http://nodemon.io/ for development.
Add simple logging mechanism to write URL and Date info to file per each request (try https://github.com/winstonjs/winston or any other library).


### node + mongo

Part 2:
1.	Install and setup mongoose.
2.	Create Mongoose scheme for blog article model.
3.	Replace "console logs"/stubs from part 1 to real communication with database.
•	Find all blogs
•	Find blog by ID
•	Insert blog
•	Update blog record
•	Delete blog from DB
4.	Implement error handling middleware (examples here) which will send an error without stack trace to client.

*Advanced:
Describe mongoose scheme for User model. Implement user registration, add authorization and authentication using http://www.passportjs.org/ (any strategy) for accessing blog article.


### React

Create simple client blog application (e.g. like Twitter). It should have the ability to add/delete post, show all posts and filter them by authors.

Task 1:
1)	Set up dev environment
2)	Create all the markup with react;
3)	Add the ability to add new post;
4)	Add the ability to filter posts;
5)	Implement Server-Side rendering;

All posts data could be stored in the state of the app, but If this task would be too easy for you, you can connect your application to the Node.js server from the previous task (because this step would be necessary in the second home task).

Task 2:
1)	Connect your application from the previous tasks to the Node.js server (from the previous Node.js module)
2)	Add redux and react-router;
3)	Add registration/authentication functionality.
4)	Add tests and some performance tweaks;
5)	Add or update server-side rendering functionality;


### Angular

Part 1.

1. Add AngularJS 1.#.# to a project
2. Add minimum functionality
    a. Add status(is it done or not) and date creation to todo model
    b. Create a view displaying two lists of todos: “Done todos” and “New todos”
    c. Add filtering for todo list on base how old is the todo in days
3. Add more functionality
    a. Add validation to the form
        i. Fields "Text" should be mandatory
        ii. Create a custom validator that check the minimum length of a todo text: 20 symbols.
    b. Reuse the form above to edit an article by clicking on article title
    c. Add sorting by first letter and by date
4. Add routes and resource
    a. "Add todo"/"Edit todo" forms should be opened inside different views.
    b. Make sure that "Add todo"/"Edit todo" views have different routes, i.e.
        i. /admin/article/<todoId>/edit
        ii. /admin/article/add
5. Load todos from external resource
    c. Use Resource to make requests to a server
    d. Make todo.json load first todos from the file


Part 2.

Task is to create the admin panel using latest AngularJS:

	1. Add AngularJS 1.6.1 to a project
	2. Add minimum functionality
		a. Create a component for displaying amount of articles and list of their titles
		b. Create a form (using native directives) to add an article
	3. Add more functionality
		a. Add validation to the form
			i. Fields "Title" and "Content" should be mandatory
			ii. Create a custom validator that check the minimum length of an article 20 symbols (optional).
		b. Reuse the form above to edit an article by clicking on article title.
			i. Hint: you may probably need to pass an action to the button using "&"
		c. Create a component-button "Add an article" and open appropriate form on click
	4. Add routes and resource
		a. "Add article"/"Edit article" forms should be opened inside different views.
		b. Make sure that "Add article"/"Edit article" views have different routes, i.e.
			i. /admin/article/<articleId>/edit
			ii. /admin/article/add
		c. Use Resource to make requests to a server.
	5. To have more experience *
		a. Create pagination component and use it to display a list of articles
		b. List of numbers for pagination buttons on should be generated using custom Filter
* Making  #5 without part (b) can be also considered as "excellent"


### Unit tests

1. Create task for running unit tests;
2. Add code coverage report;
3. Test your one of your apps(node, react, angular);
4. Snapshot testing;
5. Use stryker-mutator at least for one project. Test all of your apps (node, react, angular)
