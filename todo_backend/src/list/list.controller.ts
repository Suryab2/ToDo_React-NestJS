import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateListDto } from './dto/update-list.dto';
// import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService,
    private readonly userService:UsersService) {}

  @Post('/addList')
  async create(@Body() createListDto: CreateListDto) {
    const userData=await this.userService.findOne(createListDto.userId)
    return  this.listService.create(createListDto,userData);
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch('/editList/:id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete('/deleteList/:id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
