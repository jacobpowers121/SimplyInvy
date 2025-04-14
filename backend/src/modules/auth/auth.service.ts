import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

@Injectable()
export class AuthService {
  private cognito: CognitoIdentityServiceProvider;

  constructor() {
    // Initialize the AWS Cognito client with your region.
    this.cognito = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  async login(username: string, password: string) {
    console.log("hello world");
    return "hello world";
    // const params: CognitoIdentityServiceProvider.InitiateAuthRequest = {
    //   AuthFlow: 'USER_PASSWORD_AUTH',
    //   ClientId: process.env.COGNITO_CLIENT_ID,
    //   AuthParameters: {
    //     USERNAME: username,
    //     PASSWORD: password,
    //   },
    // };
    //
    // try {
    //   const response = await this.cognito.initiateAuth(params).promise();
    //   return response.AuthenticationResult;
    // } catch (error: any) {
    //   // You may want to log the error details for debugging
    //   throw new UnauthorizedException('Invalid username or password');
    // }
  }
}
