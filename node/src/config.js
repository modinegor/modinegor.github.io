const localhost = 'localhost';

const config = {
    server: {
        port: 9001,
        address: localhost
    },
    mongo: {
        host: localhost,
        db: 'frontcamp',
        collection: 'blogs',
        username: undefined,
        password: undefined,
        port: 27017
    }
};

module.exports = config;