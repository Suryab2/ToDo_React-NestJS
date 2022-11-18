import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/utils/bcrypt';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async addUser(createUserDto: CreateUserDto) {
    try {
      const password = encodePassword(createUserDto.password);
      const user = this.userRepo.create({ ...createUserDto, password }); 
      await this.userRepo.save(user);
      return { errno:200 };
    } catch (e) {
      return e;
    }
  }

  async findAll(email: string) {
    const userDetails = await this.userRepo.findOne({ where: { email } });
    return userDetails;
  }

  findOne(user_id: number) {
    return this.userRepo.findOne({ where: { user_id } });
  }
  async findOneUser(user_id: number) {
    const userlist = await this.userRepo.findOne({
      where: { user_id },
      relations: ['list'],
    });
    return userlist.list;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
