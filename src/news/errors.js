export function showMessage(message) {
    document.getElementById('articles').innerHTML = `<div id="info-message">${message}</div>`;
}