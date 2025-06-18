import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/client.entity';
import { SaleProduct } from './sale-product.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleProduct, Client, Product])],
  providers: [SalesService, ClientsService, ProductsService],
  controllers: [SalesController]
})
export class SalesModule {}
