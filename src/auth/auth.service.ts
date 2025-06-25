import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService
    ){}

    async login(email: string, password: string) {

        const user = await this.userRepo.findOneBy({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            // TODO gerar o jwt
            
            const payload = { 
                userId: user.id,
                username: user.email
            };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new Error('User or password is invalid');
        }

    }

}
