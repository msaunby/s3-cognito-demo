import AmazonCognitoIdentity from "/static/javascript/amazon-cognito-identity.min.js";

console.log("SETTING UP");

const AWS_COGNITO_USER_POOL_ID = 'eu-west-2_7EYlL3eMQ';
const AWS_COGNITO_USER_POOL_CLIENT_ID = 'ffjmv51r3e7s0ht3b4eo7s93c';
const REDIRECT_TO = 'index.html';

    const signIn = function(){
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        console.log("Logging in user:", username);
    
    var authenticationData = {
        Username : username,
        Password : password
    }    
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : AWS_COGNITO_USER_POOL_ID,
        ClientId : AWS_COGNITO_USER_POOL_CLIENT_ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log("YES.  YOU'VE LOGGED IN.");
            location.href = REDIRECT_TO;
        },
        onFailure: function(err) {
            console.log("Authentication failed.");
            console.log(err);
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) { 
            console.log('new password required');
            console.log(userAttributes);
            console.log(requiredAttributes);
        }
    });
    }

console.log("SETUP DONE");
const form = document.getElementById("signin_form");
form.addEventListener("submit", signIn);