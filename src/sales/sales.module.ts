import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Client])],
  providers: [SalesService, ClientsService],
  controllers: [SalesController]
})
export class SalesModule {}
