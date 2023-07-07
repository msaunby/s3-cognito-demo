
AWS_COGNITO_USER_POOL_ID = 'eu-west-2_7EYlL3eMQ';
AWS_COGNITO_USER_POOL_CLIENT_ID = 'ffjmv51r3e7s0ht3b4eo7s93c';

var poolData = {
    UserPoolId: AWS_COGNITO_USER_POOL_ID,
    ClientId: AWS_COGNITO_USER_POOL_CLIENT_ID
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

if (userPool.getCurrentUser())
{
    const prompt = document.querySelector('#LogInOut');
    prompt.innerHTML = '<p><a href="signout.html">Sign out</a></p>';
} else {
    const prompt = document.querySelector('#LogInOut');
    prompt.innerHTML = '<p>Please <a href="signin.html">sign in</a>.</p>';
}