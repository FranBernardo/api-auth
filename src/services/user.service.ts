import { Injectable } from '@nestjs/common';
@Injectable()
export class UserService {
  getUserTest(data: any): string {
    return data;
  }
}
