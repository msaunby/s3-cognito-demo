# Secure static website content

An example of the use of AWS Cognito for authenitication and to protect some website content.

Things to note about this example.

 * There are two just levels of authorisation - public, and authorised. Authorised users have read permission for the contents of the protected data.

* Usernames and passwords can be individual or shared.  However, there is no personal data, all authorised users have read access for all the protected data.

Authentication and authorisation is with AWS Cognito
<https://aws.amazon.com/cognito/>

Overview <https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html>

## Cognito user pool

A user pool can contain any number of users, with users assigned to groups.  Groups are optional, as we are using just one login, or optionally multiple logins all with the same permissions, we won't create any groups.

Two keys need to be included in the login script.

AWS_COGNITO_USER_POOL_ID  This identifes the user pool, and will be required for all applications that this pool of users are authorised to use.

AWS_COGNITO_USER_POOL_CLIENT_ID Identifies the client.  A different client ID is required for each application, for example if you have a mobile app and and web site then each would have its own client ID.

There are lots of configuration options for the user pool, some of which will influence the design of applications. For example, whether the user can reset their password, and how this is done, e.g. sending an SMS message or a reset email.  For these you will need a form for the user to send a phone number, or enter a code sent to their email.

### S3 Bucket settings

In Object Ownership set ACLs enabled (essential) and Object writer is owner (unsure if needed). 

CORS

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2",
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

The bucket is accessed by Cognito Identity Pool - s3pyweb_id_pool. The ID pool does not need changing.

Instead just edit IAM role ```Cognito_s3pyweb_idpool_testAuth_Role```

Probably call the role something like ```My_web_app_Auth_Role```


### Using tokens

Cognito uses three tokens - ID, Access, and Refresh.  The refresh token has a minimum expiration of 60 minutes, the others can be much shorter.

See <https://aws.amazon.com/about-aws/whats-new/2020/08/amazon-cognito-user-pools-supports-customization-of-token-expiration/>

<https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html>

<https://www.npmjs.com/package/jwt-decode>

```sh
npm install jwt-decode
cp node_modules/jwt-decode/build/jwt-decode.js demo-static/static/
```

### S3 buckets

https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
