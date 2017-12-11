export function showMessage(message) {
    document.getElementById('shown-articles').innerHTML = `<div id="info-message">${message}</div>`;
}