describe('blogResources', () => {
    let blogResources,
        api_url = '/api/blog',
        $httpBackend,
        articlesResponse = [
            {title: 'first article title', text: 'first article text'},
            {title: 'second article title', text: 'second article text'}
        ];

    beforeEach(module('blogApp'));

    beforeEach(inject((_$httpBackend_, _blogResources_) => {
        blogResources = _blogResources_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('/views/part2/blog.html').respond({});
    }));

    it('should exist', () => {
        expect(blogResources).toBeDefined();
    });

    describe('.get()', () => {
        it('should exist', () => {
            expect(blogResources.get).toBeDefined();
        });

        it('get should return proper data', () => {
            $httpBackend.whenGET(api_url).respond(articlesResponse);
            $httpBackend.expectGET(api_url);

            blogResources.get();

            $httpBackend.flush();
        });
    });

    describe('.post()', () => {
        it('.post() should exist', () => {
            expect(blogResources.post).toBeDefined();
        });

        it('.post() should send data', () => {
            $httpBackend.whenPOST(api_url).respond({});
            $httpBackend.expectPOST(api_url);

            blogResources.post('', '');

            $httpBackend.flush();
        });

        it('.post() should send data by article id', () => {
            $httpBackend.whenPOST(api_url + '/2').respond(200, '');
            $httpBackend.expectPOST(api_url + '/2');

            blogResources.post('', '', 2);

            $httpBackend.flush();
        });
    });
});