import { Body, Controller, Get, Post } from '@nestjs/common';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SalesService } from './sales.service';
import { ClientsService } from 'src/clients/clients.service';
import { SaleProduct } from './sale-product.entity';
import { ProductsService } from 'src/products/products.service';

@Controller('sales')
export class SalesController {

    constructor(private readonly salesService: SalesService,
                private readonly clientsService: ClientsService,
                private readonly productsService: ProductsService
    ) {}

    @Get()
    findAll() {
        return this.salesService.findAll();
    }

    @Post()
    async create(@Body() createSaleDto: CreateSaleDto) {

        if (!createSaleDto || !createSaleDto.clientId) {
            throw new Error('Client Id is required.');
        }

        if (!createSaleDto.products || createSaleDto.products.length == 0) {
            throw new Error('Products are required.');
        }

        let client = await this.clientsService.findOne(createSaleDto.clientId);
        if (!client) {
            throw new Error('Client not found.');
        }

        const products: SaleProduct[] = [];
        for (const product of createSaleDto.products) {
            
            let productEntity = await this.productsService.findOne(product.productId);
            if (!productEntity) {
                throw new Error('Product not found.');
            }
            
            const saleProduct: SaleProduct = new SaleProduct();
            saleProduct.product = productEntity;
            products.push(saleProduct);
        };
        
        const sale: Sale = new Sale();
        sale.client = client!;
        sale.products = products!;
        console.log('salvando sale', sale);

        return await this.salesService.create(sale);
    }

}
