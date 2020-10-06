exports.handle = async (event) => {
    console.log(event.body);

    // TODO Generate everything
    // TODO Zip files
    // TODO Upload to S3
    // TODO Generation pre-signed url and return it

    return buildResponse({
        output: 'http://test.com/asdf',
        version: process.env.AWS_LAMBDA_FUNCTION_VERSION
    }, 200)
}

function buildResponse(data, status) {
    return {
        statusCode: status,
        body: JSON.stringify(data),
        headers: {},
        isBase64Encoded: false
    }
}