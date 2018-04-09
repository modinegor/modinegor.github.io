const blogResources = $resource => {
    return {
        get: () => {
            return $resource('/api/blog').query().$promise;
        },
        post: (title, text, id=null) => {
            let url = '/api/blog';

            if (id !== null)
                url += `/${id}`;

            $resource(url).save({title, text});
        }
    }
};

export default blogResources;
