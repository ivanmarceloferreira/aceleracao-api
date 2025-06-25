import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { RegisterUserDto } from './register-user.dto';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Controller('users')
export class UsersController {

    // construtor de classe
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(Number(id));
        if (!user) {
            // exemplo de exceção genérica
            throw new HttpException('User not found', HttpStatus.SERVICE_UNAVAILABLE);
        }

        return user;
    }

    @Get('/name/:name')
    findByName(@Param('name') name: string) {
        return this.userService.findByName(name);
    }

    @Post()
    async create(@Body() userDto: RegisterUserDto) {

        if (!userDto.name || !userDto.email || !userDto.password) {
            throw new BadRequestException('Name, email and password are required.');
        }

        const savedUser = await this.userService.findByEmail(userDto.email);
        if (savedUser) {
            throw new ConflictException('User email already exists');
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
