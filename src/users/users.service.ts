import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInfoDto } from './dto/user-info.dto';
import { Query, UserExistsQuery } from './helpers/helpers';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
  private readonly userRepository: Repository<User> ){}

  async checkIfUserExists( username: string, password: string ): Promise<boolean> {
    const query: UserExistsQuery = new UserExistsQuery( username, password );
    const result: any = await this.userRepository.findOne( query );
    return result ? true : false;
  }

  async findUser( username: string ): Promise<User> {
    const query: Query = new Query(username);
    return await this.userRepository.findOne(query);
  }

  async findUsers( usernames: string[] ): Promise<User[]> {
    const users: User[] = [];
    for (const username of usernames) {
      const user: User = await this.findUser( username );
      users.push( user );
    }

    return users;
  }

  async createUser( userInfoDto: UserInfoDto ): Promise<boolean> {
    const result: User = await this.findUser( userInfoDto.username );
    if ( !result ){
      return await this.userRepository.save(userInfoDto) ? true : false;
    }
  }

}