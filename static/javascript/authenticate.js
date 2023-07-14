import "/static/javascript/amazon-cognito-identity.min.js";
import * as CONFIG from "/static/javascript/CONFIG.js";

var poolData = {
    UserPoolId: CONFIG.AWS_COGNITO_USER_POOL_ID,
    ClientId: CONFIG.AWS_COGNITO_USER_POOL_CLIENT_ID
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