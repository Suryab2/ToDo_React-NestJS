import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { UpdateListDto } from './dto/update-list.dto';
// import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepo: Repository<List>,
  ) {}
  async create(createListDto: CreateListDto, userData: CreateUserDto) {
    return await this.listRepo.save({
      list: createListDto.list,
      user: userData,
    });
  }

  findAll() {
    return `This action returns all list`;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(list_id: number, updateListDto: UpdateListDto) {
    return this.listRepo.update(list_id,updateListDto);
  }

  remove(list_id: number) {
    return this.listRepo.delete(list_id);
  }
}
