
## Updates Needed for Production

Security policy may need to be updated in order to access the AWS Lambda functions. It certainly won't work locally without `Content-Security-Policy` meta tag. 

`<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://7z6lcegucj.execute-api.us-east-1.amazonaws.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">`
