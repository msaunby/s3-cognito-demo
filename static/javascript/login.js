import "./amazon-cognito-identity.min.js";
import * as CONFIG from "./CONFIG.js";

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
        UserPoolId : CONFIG.AWS_COGNITO_USER_POOL_ID,
        ClientId : CONFIG.AWS_COGNITO_USER_POOL_CLIENT_ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            window.history.back();
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
    return false;
}


document.signIn = signIn;
