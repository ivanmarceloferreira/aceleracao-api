import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>) {}

    create(product: Product) {
        return this.productRepository.save(product); 
    }

    findAll() {
        return this.productRepository.find();
    }

    findOne(id: number) {
        return this.productRepository.findOneBy({ id });
    }

    async update(id: number, product: Product) {
        await this.productRepository.update(id, product);
        return this.productRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            return this.productRepository.remove(product);
        }
    }

}
