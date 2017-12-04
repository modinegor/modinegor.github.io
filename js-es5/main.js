'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var apikey = '58c65ea125b949f39e840783834dae42';

(function () {
    window.addEventListener('load', init);
})(window, document, undefined);

var sources = void 0,
    shown_sources = void 0,
    init_filter = false;

function init() {
    showSources();
    showMessage("Chose source to see the news");

    document.getElementById('scroll-up').addEventListener('click', scrollSources);
    document.getElementById('scroll-down').addEventListener('click', scrollSources);
}

function showMessage(message) {
    document.getElementById('shown-articles').innerHTML = '<div id="info-message">' + message + '</div>';
}

function showSources(category, country, language) {
    var base_url = 'https://newsapi.org/v2/sources';
    var requests = '';

    shown_sources = [];

    if (category) requests = requests + '&category=' + category;
    if (country) requests = requests + '&country=' + country;
    if (language) requests = requests + '&language=' + language;

    fetch(base_url + '?' + requests.substr(1) + '&apiKey=' + apikey).then(function (response) {
        return response.json();
    }).then(function (data) {
        var shown = document.getElementById('shown-sources');

        shown.innerHTML = '';

        sources = data.sources;
        shuffle_array(sources);

        for (var i = 0; i < 3 && i < sources.length - 1; i++) {
            shown.appendChild(new Source(sources[i]).getHtmlElement());
            shown_sources.push(i);
        }

        if (!init_filter) initFilter();
    }).catch(function (err) {
        showMessage('Error: ' + err);
    });
}

function initFilter() {
    var categories = new Set(),
        countries = new Set(),
        languages = new Set(),
        category_cmbx = document.getElementById('select-category'),
        language_cmbx = document.getElementById('select-language'),
        country_cmbx = document.getElementById('select-country');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var source = _step.value;

            categories.add(source.category);
            countries.add(source.country);
            languages.add(source.language);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = [].concat(_toConsumableArray(categories)).sort()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var category = _step2.value;

            var option = document.createElement('option');
            option.innerHTML = category;
            category_cmbx.appendChild(option);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = [].concat(_toConsumableArray(countries)).sort()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var country = _step3.value;

            var option = document.createElement('option');
            option.innerHTML = country;
            country_cmbx.appendChild(option);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = [].concat(_toConsumableArray(languages)).sort()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var language = _step4.value;

            var option = document.createElement('option');
            option.innerHTML = language;
            language_cmbx.appendChild(option);
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    category_cmbx.addEventListener('change', changeFilter);
    country_cmbx.addEventListener('change', changeFilter);
    language_cmbx.addEventListener('change', changeFilter);

    init_filter = true;
}

function changeFilter() {
    var category_cmbx = document.getElementById('select-category'),
        language_cmbx = document.getElementById('select-language'),
        country_cmbx = document.getElementById('select-country');

    showSources(category_cmbx.options[category_cmbx.selectedIndex].text, country_cmbx.options[country_cmbx.selectedIndex].text, language_cmbx.options[language_cmbx.selectedIndex].text);
}

function scrollSources(event) {
    var target = event.target.id,
        div = document.getElementById('shown-sources'),
        child = div.childNodes;


    if (target === 'scroll-up' && shown_sources[0] !== 0) {
        shown_sources.pop();
        div.removeChild(child[child.length - 1]);
        div.insertBefore(new Source(sources[shown_sources[0] - 1]).getHtmlElement(), child[0]);
        shown_sources = [shown_sources[0] - 1].concat(_toConsumableArray(shown_sources));
    } else if (target === 'scroll-down' && shown_sources[shown_sources.length - 1] !== sources.length - 1) {
        shown_sources = shown_sources.slice(1);
        div.removeChild(child[0]);

        var new_item = shown_sources[shown_sources.length - 1] + 1;

        div.appendChild(new Source(sources[new_item]).getHtmlElement());
        shown_sources.push(new_item);
    }
}

function showArticles(event) {
    var target = event.target;

    fetch('https://newsapi.org/v2/top-headlines?sources=' + target.id + '&apiKey=' + apikey).then(function (responce) {
        return responce.json();
    }).then(function (data) {
        var articles_div = document.getElementById('shown-articles');

        articles_div.innerHTML = '';

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = data.articles[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var article = _step5.value;

                articles_div.appendChild(new Article(article).getHtmlElement());
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }
    }).catch(function (err) {
        showMessage('Error: ' + err);
    });
}

var Source = function () {
    function Source(obj) {
        _classCallCheck(this, Source);

        this.description = obj.description;
        this.id = obj.id;
        this.name = obj.name;
        this.url = obj.url;


        return new Proxy(this, {
            set: function set(target, name, value) {
                throw new Error('Source object is read only object');
            }
        });
    }

    _createClass(Source, [{
        key: 'getHtmlElement',
        value: function getHtmlElement() {
            var div = document.createElement('div');

            div.className = 'source-item';
            div.innerHTML = this.logo + '<div>' + this.title + this.button + '</div>';

            div.getElementsByClassName("read-source-button")[0].addEventListener('click', showArticles);

            return div;
        }
    }, {
        key: 'logo',
        get: function get() {
            return '<img src="https://icons.better-idea.org/icon?url=' + this.url + '&size=50" class="source-logo" title="' + this.description + '"/>';
        }
    }, {
        key: 'button',
        get: function get() {
            return '<div class="read-source-button" id="' + this.id + '">Read Me</div>';
        }
    }, {
        key: 'title',
        get: function get() {
            return '<div class="source-name">' + this.name + '</div>';
        }
    }]);

    return Source;
}();

var Article = function () {
    function Article(obj) {
        _classCallCheck(this, Article);

        this.description = obj.description;
        this.article_title = obj.title;
        this.time = obj.publishedAt;
        this.url = obj.url;
        var _obj$source = obj.source;
        this.source_id = _obj$source.id;
        this.source_name = _obj$source.name;
        this.image_url = obj.urlToImage;


        return new Proxy(this, {
            set: function set(target, name, value) {
                throw new Error('Article object is read only object');
            },
            get: function get(target, name) {
                if (name === 'description' || name === 'article_title') {
                    return target[name].replace(/(\d{5,})/g, function (_, res) {
                        return parseInt(res).toLocaleString();
                    });
                }
                return target[name];
            }
        });
    }

    _createClass(Article, [{
        key: 'getHtmlElement',
        value: function getHtmlElement() {
            var div = document.createElement('div');

            div.className = 'article-item';
            div.innerHTML = '' + this.head + this.title + this.image + this.info;

            return div;
        }
    }, {
        key: 'publishedAt',
        get: function get() {
            if (!this.time) return '';

            return ' @ ' + new Date(this.time).toLocaleString();
        }
    }, {
        key: 'head',
        get: function get() {
            return '<div class="article-head">' + (this.source_name || this.source_id) + this.publishedAt + '</div>';
        }
    }, {
        key: 'title',
        get: function get() {
            return '<div class="article-title">' + this.article_title + '</div>';
        }
    }, {
        key: 'image',
        get: function get() {
            if (!this.image_url) return '';

            return '<a href="' + this.url + '" target="_blank"><div class="article-image"><img src="' + this.image_url + '"/></div></a>';
        }
    }, {
        key: 'info',
        get: function get() {
            if (!this.image_url) {
                var description = this.description || 'Read this article on ' + (this.source_name || this.source_id) + ' website';
                return '<a href="' + this.url + '" target="_blank" class="article-info">' + description + '</a>';
            } else if (this.description) return '<div class="article-info">' + this.description + '</div>';

            return '';
        }
    }]);

    return Article;
}();

function shuffle_array(array) {
    for (var i = 1; i < array.length; i++) {
        var rand_i = Math.floor(Math.random() * (i + 1));

        var _ref = [array[rand_i], array[i]];
        array[i] = _ref[0];
        array[rand_i] = _ref[1];
    }
}
//# sourceMappingURL=main.js.map