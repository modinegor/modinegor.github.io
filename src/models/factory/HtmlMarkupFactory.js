import {BoxHtmlRender, HtmlRenderer, ImageHtmlRender, LinkHtmlRender} from "../renders/HtmlRender";
import MarkupFactory from "./MarkupFactory";


class HtmlMarkupFactory extends MarkupFactory {
    create(type, attr, body) {
        let obj;

        switch (type) {
            case 'div':
            case 'block':
                obj = new BoxHtmlRender();
                break;
            case 'img':
            case 'image':
                obj = new ImageHtmlRender();
                break;
            case 'a':
            case 'link':
                obj = new LinkHtmlRender();
                break;
            default:
                obj = new HtmlRenderer();
        }

        return obj.render(attr, body);
    }
}

const HtmlMarkupStrategy = new HtmlMarkupFactory();

export default HtmlMarkupStrategy;
