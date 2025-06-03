import { Body, Controller, Post } from '@nestjs/common';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './create-sale.dto';
import { SalesService } from './sales.service';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/client.entity';

@Controller('sales')
export class SalesController {

    constructor(private readonly salesService: SalesService,
                private readonly clientsService: ClientsService
    ) {}

    @Post()
    async create(@Body() createSaleDto: CreateSaleDto) {

        if (!createSaleDto || !createSaleDto.clientId) {
            throw new Error('Client Id is required.');
        }

        let client = await this.clientsService.findOne(createSaleDto.clientId);
        if (!client) {
            throw new Error('Client not found.');
        }

        let sale: Sale = new Sale();
        sale.client = client!;

        return this.salesService.create(sale);
    }

}
