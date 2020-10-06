const lambda = require('../../src/index');

describe('Test basic builder', function () {
    it('An empty request triggers a 200 response', async () => {
        const event = {
            httpMethod: 'POST',
            body: '[]'
        };

        const result = await lambda.handle(event);

        expect(result.statusCode).toEqual(200);
    });
});
