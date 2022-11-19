import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersEntity } from './Users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersReepository: Repository<UsersEntity>,
  ) {}

  async findAllUser() {
    return await this.usersReepository.find({
      select: ['id', 'firstName', 'lastName', 'email'], // Rtorna só oq eu passar
    });
  }

  async findOneUser(options: FindOneOptions<UsersEntity>) {
    try {
      return await this.usersReepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createUser(data: CreateUserDTO) {
    const user = await this.usersReepository.create(data);

    return await this.usersReepository.save(user);
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await this.usersReepository.findOneOrFail({
      where: { id },
    });

    this.usersReepository.merge(user, data);

    return await this.usersReepository.save(user);
  }

  async deletUser(id: string) {
    await this.usersReepository.findOneOrFail({
      where: { id },
    });

    await this.usersReepository.softDelete({ id });
  }
}
