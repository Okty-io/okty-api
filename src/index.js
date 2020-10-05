exports.handle = async (event) => {
    console.log('### Invoked');
    console.log(event);

    let containerConfigs = [];

    try {
        containerConfigs = JSON.parse(event.body);
    } catch (e) {
        return buildResponse({ error: 'Request does not contain a valid JSON' }, 400)
    }

    console.log(containerConfigs);

    return buildResponse({
        output: 'http://test.com/asdf',
        version: process.env.AWS_LAMBDA_FUNCTION_VERSION,
        foo: 'bar'
    }, 200)
}

function buildResponse(data, status, headers = []) {
    return {
        statusCode: status,
        body: JSON.stringify(data),
        headers: {},
        isBase64Encoded: false
    }
}