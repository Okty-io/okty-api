exports.handle = async (event) => {

    console.log('### Invoked');
    console.log(event);

    return buildResponse({version: 3}, 200);

    /*
    let containerConfigs = [];

    try {
        containerConfigs = JSON.parse(event.body);
    } catch (e) {
        return buildResponse({ error: 'Request does not contain a valid JSON' }, 400)
    }

    return buildResponse({ count: containerConfigs.length, foo: 'bar' }, 200)
     */
}

function buildResponse(data, status, headers = []) {
    return {
        statusCode: status,
        body: JSON.stringify(data),
        headers: {},
        isBase64Encoded: false
    }
}