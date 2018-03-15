export default ({body}) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>React app</title>
                <script defer src="/dist/main.bundle.js"></script>
            </head>
            <body>
                <div id="app">${body}</div>
            </body>
        </html>
    `;
}