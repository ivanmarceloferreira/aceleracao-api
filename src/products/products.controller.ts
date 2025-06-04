import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
  
  constructor(private readonly productService: ProductsService,
              private readonly categoryService: CategoriesService
  ) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    
    if (
      !createProductDto ||
      !createProductDto.name ||
      !createProductDto.price ||
      !createProductDto.categoryId
    ) {
      throw new Error('Name, price and categoryId are required.');
    }

    const category = await this.categoryService.findOne(createProductDto.categoryId);
        if (!category) {
            throw new Error('Category not found.');
        }

    const product = new Product();
    product.name = createProductDto.name;
    product.price = createProductDto.price;
    product.description = createProductDto.description;
    product.category = category;

    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productService.update(Number(id), product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(Number(id));
  }
}
