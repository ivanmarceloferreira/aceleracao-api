import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {

  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Product) {
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
