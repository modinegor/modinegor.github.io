import 'babel-polyfill';
import 'whatwg-fetch';

import '../css/main.sass';
import '../css/intro/main.sass'


(() => {
    window.addEventListener('load', init);
})(window, document, undefined);

function init() {
    document.getElementById('show-button').addEventListener('click', showNewsPage);
}

function showNewsPage() {
    document.getElementById('main').innerHTML = '' +
        `<div id="articles"></div>
         <div id="sources">
             <div id="sources-box">
                 <div id="shown-sources"></div>
                 <div id="scroll">
                     <div id="scroll-up">&#9651;</div>
                     <div id="scroll-down">&#9651;</div>
                 </div>
             </div>
             <div id="filter">
                 <div>filter sources</div>
                 <div>
                     <span>Country:</span>
                     <select id="select-country">
                         <option value="default"></option>
                     </select>
                 </div>
                 <div>
                     <span>Language:</span>
                     <select id="select-language">
                         <option value="default"></option>
                     </select>
                 </div>
                 <div>
                     <span>Category:</span>
                     <select id="select-category">
                         <option value="default"></option>
                     </select>
                 </div>
             </div>
         </div>`;

    require.ensure([], function(require) {
        let module = require('./sources/main.js'),
            errors = require('./errors.js');

        require('../css/news/main.sass');
        require('../css/news/sources.sass');
        require('../css/news/articles.sass');
        require('../css/news/media/media_max_width_1200.sass');

        module.showSources();
        errors.Error.show("Chose source to see the news");

        document.getElementById('scroll-up').addEventListener('click', module.scrollSources);
        document.getElementById('scroll-down').addEventListener('click', module.scrollSources);
    });
}
