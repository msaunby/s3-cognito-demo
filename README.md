# s3-cognito-demo
A static website with Cognito authentication 


## Running the example

Install VS Code Live Share extension.

Right click on ```static/index.html``` 

Select **Open with Live Share**

Use these credentials -

```
username: user
password: password
```

## How it works


### Dependencies

```
<script src="amazon-cognito-identity.min.js"></script>
<script src="aws-sdk.min.js"></script>
```

See <https://www.npmjs.com/package/amazon-cognito-identity-js>

## Infrastructure and configuration

Need two buckets, one configured as a
static website, the other to contain the
protected content.

```
AWS_COGNITO_USER_POOL_ID = 'eu-west-2_XXXXXXXX';
AWS_COGNITO_USER_POOL_CLIENT_ID = 'xxxxxxxxxxxxxxxxxxx';

AWS_DEFAULT_REGION = 'eu-west-2';
AWS_COGNITO_IDENTITY_POOL_ID = 'eu-west-2:xxxxx-xxxxxx-xxxxx';
S3_BUCKET_NAME = 'protected.saunby.net';
AWS_COGNITO_USER_POOL_PROVIDER = 'cognito-idp.eu-west-2.amazonaws.com/eu-west-2_XXXXXXXX';
    
```