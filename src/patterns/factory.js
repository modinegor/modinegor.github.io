import {BoxDecorator, ImageDecorator, LinkDecorator, Renderer} from "./decorator";

export function htmlElement(type, attr, body) {
    const renderer = new Renderer(attr, body);
    let obj;

    switch (type) {
        case 'div':
        case 'block':
            obj = new BoxDecorator(renderer);
            break;
        case 'img':
        case 'image':
            obj = new ImageDecorator(renderer);
            break;
        case 'a':
        case 'link':
            obj = new LinkDecorator(renderer);
            break;
        default:
            obj = new BoxDecorator(renderer);
    }

    return obj.render();
}