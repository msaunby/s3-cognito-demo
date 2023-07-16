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

....

### Dependencies

```
"amazon-cognito-identity.min.js"
"aws-sdk.min.js"
```

See <https://www.npmjs.com/package/amazon-cognito-identity-js> for details of how to obtain these.

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

## IAM Role

Requires trust relationship
```
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::000000000000:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:msaunby/s3-cognito-demo:*"
                }
            }
        }
    ]
}
```
And Permissions
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Action": [
				"s3:PutObject",
				"s3:PutObjectAcl"
			],
			"Resource": [
				"arn:aws:s3:::demo1.saun.by/*"
			],
			"Effect": "Allow"
		},
		{
			"Action": [
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::demo1.saun.by"
			],
			"Effect": "Allow"
		}
	]
}
```
