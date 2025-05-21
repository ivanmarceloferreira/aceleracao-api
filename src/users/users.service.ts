import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {}

    create(user: User) {
        return this.userRepository.save(user); 
    }

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

    async update(id: number, user: User) {
        await this.userRepository.update(id, user);
        return this.userRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
            return this.userRepository.remove(user);
        }
    }

}
