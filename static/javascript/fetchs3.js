AWS_COGNITO_USER_POOL_ID = 'eu-west-2_7EYlL3eMQ';
AWS_COGNITO_USER_POOL_CLIENT_ID = 'ffjmv51r3e7s0ht3b4eo7s93c';

AWS_DEFAULT_REGION = 'eu-west-2';
AWS_COGNITO_IDENTITY_POOL_ID = 'eu-west-2:cd6890c8-4e8a-4f5f-bdaa-f84a77adc4c9';
S3_BUCKET_NAME = 'protected.saunby.net';
AWS_COGNITO_USER_POOL_PROVIDER = 'cognito-idp.eu-west-2.amazonaws.com/eu-west-2_7EYlL3eMQ';

var poolData = {
    UserPoolId: AWS_COGNITO_USER_POOL_ID,
    ClientId: AWS_COGNITO_USER_POOL_CLIENT_ID
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

cognitoUser = userPool.getCurrentUser();

if (cognitoUser) {

    cognitoUser.getSession(function (err, result) {
        if (result) {
            // Now logged in.
            // Get id token for S3 bucket access
            var idToken = result.idToken.jwtToken;
            var accessToken = result.getAccessToken().getJwtToken();

            AWS.config.region = AWS_DEFAULT_REGION;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
                Logins: {
                    [AWS_COGNITO_USER_POOL_PROVIDER]: idToken
                }
            });

            AWS.config.credentials.get(function (err) {
                if (err) {
                    console.error("get credentials failed");
                    console.error(err);
                    location.href = '/';
                }
                var s3 = new AWS.S3({
                    apiVersion: '2006-03-01',
                    params: { Bucket: S3_BUCKET_NAME }
                });

                // If the url ends ?get=/some/path then
                // redirect to that path in the protected bucket

                let query = window.location.search;
                let params = new URLSearchParams(query);
                let path = params.get('get');


                params = { Bucket: S3_BUCKET_NAME, Key: path };
                let url = s3.getSignedUrl('getObject', params);
                document.location.replace(url);
            });
        }
    });
} else {
    document.location.replace('signin.html');
}