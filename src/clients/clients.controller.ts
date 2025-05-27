import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
  // construtor de classe
  constructor(private readonly clientService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(Number(id));
  }

  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.clientService.findByName(name);
  }

  @Post()
  create(@Body() client: Client) {

    if (!client.name || !client.cpfCnpj || !client.birthDate) {
      throw new Error('Name, CPF/CNPJ, and Birth Date are required fields.');
    }
    
    return this.clientService.create(client);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() client: Client) {
    return this.clientService.update(Number(id), client);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(Number(id));
  }
}
