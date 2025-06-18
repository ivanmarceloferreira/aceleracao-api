import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalesService {

    constructor(
        @InjectRepository(Sale)
        private salesRepository: Repository<Sale>
    ){}

    findAll() {
        return this.salesRepository.find();
    }

    async create(sale: Sale) {
        return await this.salesRepository.save(sale);
    }

}
