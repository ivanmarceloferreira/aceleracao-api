import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    async login(email: string, password: string) {

        const user = await this.userRepo.findOneBy({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            console.log('LOGOU NESSA BAGAÇA!!!')
        } else {
            throw new Error('User or password is invalid');
        }

    }

}
