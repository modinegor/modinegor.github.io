function removeNumberAttrs(obj) {
    for (let item in obj) {
        if (typeof obj[item] === 'number') {
            delete obj[item];
        } else if (typeof obj[item] === 'object') {
            obj[item] = removeNumberAttrs(obj[item]);
        }
    }
    return obj;
}

module.exports = (content) => {
    try {
        content = JSON.parse(content);
    } catch(e) {
        alert('Invalid json');
    }

    return `module.exports = ${JSON.stringify(removeNumberAttrs(content))}`;
};