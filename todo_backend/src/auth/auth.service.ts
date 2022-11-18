import { Inject, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/utils/bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const userDB = await this.userService.findAll(email);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log('User Validation Successful');
        return {status:true,id:userDB.user_id};
      } else {
        console.log('Password Do Not  Match');
        return {status:false};
      }
    }
    console.log('User Verification Failed');
    return {status:false};
  }
}
