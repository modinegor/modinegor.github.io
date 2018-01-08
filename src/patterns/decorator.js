export class Renderer {
    constructor(attributes, body) {
        this.item = '';

        for (let attr in attributes) {
            let value = attributes[attr];
            if (value instanceof Array)
                value = value.join(' ');
            this.item += ` ${attr}="${value}"`;
        }

        if (body instanceof Array) {
            body = body.join('');
        }

        this.body = body;
    }
}

class VisualDecorator {
    constructor(render) {
        this.content = render.item;
        this.body = render.body;
        this.tag = '';
    }

    render() {
        let content = `<${this.tag}${this.content}`;

        if(this.body !== undefined)
            content += `>${this.body}</${this.tag}>`;
        else
            content += '/>';

        return content;
    }
}

export class ImageDecorator extends VisualDecorator {
    constructor(render) {
        super(render);
        this.tag = 'img';
    }
}

export class BoxDecorator extends VisualDecorator {
    constructor(render) {
        super(render);
        this.tag = 'div';
    }
}

export class LinkDecorator extends VisualDecorator {
    constructor(render) {
        super(render);
        this.tag = 'a';
    }
}
