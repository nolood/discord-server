import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return [{ name: 'Egor', age: 10 }];
  }
}
