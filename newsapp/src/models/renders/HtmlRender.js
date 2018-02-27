class HtmlRenderer {
    constructor() {
        this.tag = '';
    }

    render(attr, body) {
        let content = `<${this.tag}${HtmlRenderer._attr_to_string(attr)}`;

        if(body !== undefined) {
            if (body instanceof Array)
                body = body.join('');

            content += `>${body}</${this.tag}>`;
        }
        else
            content += '/>';

        return content;
    }

    static _attr_to_string(attributes) {
        let content = '';

        for (let attr in attributes) {
            let value = attributes[attr];
            if (value instanceof Array)
                value = value.join(' ');
            content += ` ${attr}="${value}"`;
        }

        return content;
    }
}

class ImageHtmlRender extends HtmlRenderer {
    constructor() {
        super();
        this.tag = 'img';
    }
}

class BoxHtmlRender extends HtmlRenderer {
    constructor() {
        super();
        this.tag = 'div';
    }
}

class LinkHtmlRender extends HtmlRenderer {
    constructor() {
        super();
        this.tag = 'a';
    }
}

export {HtmlRenderer, LinkHtmlRender, ImageHtmlRender, BoxHtmlRender}
