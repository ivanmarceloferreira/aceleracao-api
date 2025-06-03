import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  
    constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(client: Client) {
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: number) {
    return await this.clientRepository.findOneBy({ id });
  }

  findByName(name: string) {
    return this.clientRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async update(id: number, client: Client) {
    await this.clientRepository.update(id, client);
    return this.clientRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const client = await this.clientRepository.findOneBy({ id });
    if (client) {
      return this.clientRepository.remove(client);
    }
  }
}
