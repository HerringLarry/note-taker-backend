import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  async findUser(): Promise<string> {
    return 'hello';
  }
}