import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  helloWorld() {
    console.log('Hello World');
  }
}
