function articleController() {
    this.edit = () => {
        this.onEdit();
    };
}

const articleContainer = {
    templateUrl: '/views/part2/components/article.html',
    controllerAs: 'art',
    controller: articleController,
    bindings: {
        article: '<',
        onEdit: '&'
    }
};

export default articleContainer;
