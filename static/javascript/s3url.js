import "/static/javascript/amazon-cognito-identity.min.js";
import "/static/javascript/aws-sdk.min.js";
import * as CONFIG from "/static/javascript/CONFIG.js";

const poolData = {
    UserPoolId: CONFIG.AWS_COGNITO_USER_POOL_ID,
    ClientId: CONFIG.AWS_COGNITO_USER_POOL_CLIENT_ID
};

function s3url(path, cb) {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.getSession(function (err, result) {
        // Logged in, so get id token for S3 bucket access.
        var idToken = result.idToken.jwtToken;
        AWS.config.region = CONFIG.AWS_DEFAULT_REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: CONFIG.AWS_COGNITO_IDENTITY_POOL_ID,
            Logins: {
                [CONFIG.AWS_COGNITO_USER_POOL_PROVIDER]: idToken
            }
        });

        AWS.config.credentials.get(function (err) {
            if (err) {
                console.error("get credentials failed");
                console.error(err);
                cb('/bad_url');
            }
            var s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: { Bucket: CONFIG.S3_BUCKET_NAME }
            });
            const params = { Bucket: CONFIG.S3_BUCKET_NAME, Key: path };
            cb(s3.getSignedUrl('getObject', params));
        });
    });
}

export { s3url };