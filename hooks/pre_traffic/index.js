const AWS = require('aws-sdk');
const codedeploy = new AWS.CodeDeploy({ apiVersion: '2014-10-06' });
const lambda = new AWS.Lambda();

exports.handler = (event, context, callback) => {
    const deploymentId = event.DeploymentId;
    const lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;

    const functionToTest = process.env.NewVersion;
    console.log("Testing new function version: " + functionToTest);

    const lambdaParams = {
        FunctionName: functionToTest,
        Payload: JSON.stringify({ body: { test: true } }),
        InvocationType: "RequestResponse"
    };

    let lambdaResult = "Failed";
    lambda.invoke(lambdaParams, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            lambdaResult = "Failed";
        } else {
            const result = JSON.parse(data.Payload);
            console.log("Result: " + JSON.stringify(result));
            console.log("statusCode: " + result.statusCode);

            if (result.statusCode != "400") {
                console.log("Validation succeeded");
                lambdaResult = "Succeeded";
            } else {
                console.log("Validation failed");
            }

            const params = {
                deploymentId: deploymentId,
                lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
                status: lambdaResult
            };

            codedeploy.putLifecycleEventHookExecutionStatus(params, function (err, data) {
                if (err) {
                    console.log("CodeDeploy Status update failed");
                    console.log(err, err.stack);
                    callback("CodeDeploy Status update failed");
                } else {
                    console.log("CodeDeploy status updated successfully");
                    callback(null, "CodeDeploy status updated successfully");
                }
            });
        }
    });
}