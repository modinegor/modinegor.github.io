import {BoxDecorator, ImageDecorator, LinkDecorator, Render} from "./decorator";

export function htmlElement(type, attr, body) {
    const render = new Render(attr, body);
    let obj;

    switch (type) {
        case 'div':
        case 'block':
            obj = new BoxDecorator(render);
            break;
        case 'img':
        case 'image':
            obj = new ImageDecorator(render);
            break;
        case 'a':
        case 'link':
            obj = new LinkDecorator(render);
            break;
        default:
            obj = new BoxDecorator(render);
    }

    return obj.render();
}