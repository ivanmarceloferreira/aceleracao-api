import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>) {}

    create(category: Category) {
        return this.categoryRepository.save(category); 
    }

    findAll() {
        return this.categoryRepository.find();
    }

    findOne(id: number) {
        return this.categoryRepository.findOneBy({ id });
    }

    async update(id: number, category: Category) {
        await this.categoryRepository.update(id, category);
        return this.categoryRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (category) {
            return this.categoryRepository.remove(category);
        }
    }

}
