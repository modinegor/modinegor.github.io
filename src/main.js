import 'babel-polyfill';
import 'whatwg-fetch';

import {showSources, scrollSources} from "./sources.js";
import {showMessage} from "./errors";

import '../css/main.css';
import '../css/sources.css';
import '../css/media_max_width_1200.css';


(() => {
    window.addEventListener('load', init);
})(window, document, undefined);

function init() {
    showSources();
    showMessage("Chose source to see the news");

    document.getElementById('scroll-up').addEventListener('click', scrollSources);
    document.getElementById('scroll-down').addEventListener('click', scrollSources);
}
