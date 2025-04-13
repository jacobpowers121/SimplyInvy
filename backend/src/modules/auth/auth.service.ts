import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  test() {
    return 'Auth module is working!';
  }
}
