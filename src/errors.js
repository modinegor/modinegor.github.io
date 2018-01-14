export let Error = (function() {
    let instance,
        error_box,
        save_message;

    function init() {
        return {show: show};
    }

    let show = function(message) {
        save_message = message || save_message;
        error_box = error_box || document.getElementById('articles');

        error_box.innerHTML = `<div id="info-message">${save_message}</div>`;
    };

    return instance || (instance = init());
})();