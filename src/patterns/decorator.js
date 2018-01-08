export class Render {
    constructor(attr, body) {
        this.item = '';

        for (let attr in attributes) {
            let value = attributes[attr];
            if (value instanceof Array)
                value = value.join(' ');
            this.item += ` ${attr}="${value}"`;
        }

        this.item += '>' + (body instanceof Array ? body.join('') : body || '');
    }
}

class VisualDecorator {
    constructor(render) {
        this.content = render.item;
        this.body = true;
        this.tag = '';

        if (this.content.charAt(this.content.length - 1) === '>') {
            this.content = this.content.slice(0, -1);
            this.body = false
        }
    }

    render() {
        return `<${this.tag}${this.content}${this.body ? `</${this.tag}>` : "/>"}`
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
