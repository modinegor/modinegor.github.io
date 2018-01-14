import BaseSourcesScrolling from "./base";


class AnimatedSourcesScrolling extends BaseSourcesScrolling {
    getTransitionAttributes() {
        return 'height 3s';
    }

    getHideAttributes() {
        return 'overflow: hidden;';
    }

    getShowAttributes() {
        return 'overflow: hidden; height: 0px;';
    }

    animate(hide, show) {
        console.log(hide, show);
        hide.setAttribute('style', 'height: 0px; overflow: hidden;');
        show.setAttribute('style', 'height: 60px; overflow: hidden;');
    }
}

export const AnimatedScrolling = new AnimatedSourcesScrolling();
