const amplifyConfig = {
  Auth: {
    // Replace with your Cognito User Pool configuration after deployment
    region: 'us-east-1',
    userPoolId: 'us-east-1_EXAMPLE',
    userPoolWebClientId: 'EXAMPLECLIENTID',
    oauth: {
      domain: 'your_cognito_domain.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:5173/',
      redirectSignOut: 'http://localhost:5173/',
      responseType: 'code'
    }
  },
  API: {
    endpoints: [
      {
        name: 'bdfasnasApi',
        endpoint: (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000',
        region: 'us-east-1'
      }
    ]
  }
};

export default amplifyConfig;
