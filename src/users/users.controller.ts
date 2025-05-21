import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

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
    create(@Body() user: User) {
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
