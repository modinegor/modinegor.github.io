# Frontcamp 3

## Hometasks:

### Week 1 (ES2015)

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

### Week 2 (babel)

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

### Week 3 (webpack)

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
