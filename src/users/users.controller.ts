import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { RegisterUserDto } from './register-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {

    // construtor de classe
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(Number(id));
    }

    @Get('/name/:name')
    findByName(@Param('name') name: string) {
        return this.userService.findByName(name);
    }

    @Post()
    async create(@Body() userDto: RegisterUserDto) {

        if (!userDto.name || !userDto.email || !userDto.password) {
            throw new Error('Name, email and password are required.');
        }

        const user = new User();
        user.name = userDto.name;
        user.email = userDto.email;

        // gerar o hash da senha
        const hashedPassword = await bcrypt.hash(userDto.password, 12);
        user.password = hashedPassword;

        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: User) {
        return this.userService.update(Number(id), user);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }

}
