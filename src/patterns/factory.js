function image(attributes) {
    let img = '<img';

    for (let attr in attributes) {
        let value = attributes[attr];
        if (value instanceof Array)
            value = value.join(' ');
        img += ` ${attr}="${value}"`;
    }

    return `${img}/>`;
}

function div(attributes, body) {
    let div = '<div';

    for (let attr in attributes) {
        let value = attributes[attr];
        if (value instanceof Array)
            value = value.join(' ');
        div += ` ${attr}="${value}"`;
    }

    if (body instanceof Array)
        body = body.join('');

    return `${div}>${body}</div>`;

}

function link(attributes, body) {
    let link = '<a';

    for (let attr in attributes) {
        let value = attributes[attr];
        if (value instanceof Array)
            value = value.join(' ');
        link += ` ${attr}="${value}"`;
    }

    body = body || '';

    if (body instanceof Array)
        body = body.join('');

    return `${link}>${body}</a>`;
}

export function htmlElement(type, attr, body) {
    switch (type) {
        case 'div':
        case 'block':
            return div(attr, body);
        case 'img':
        case 'image':
            return image(attr);
        case 'a':
        case 'link':
            return link(attr, body);
    }
}