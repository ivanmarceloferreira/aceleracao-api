import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {}

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    findByName(name: string) {
        return this.userRepository.find({ 
            where: { name: ILike(`%${name}%`) }
        });
    }

}
