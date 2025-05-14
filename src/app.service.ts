import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getNomeProjeto(): string {
    return 'Projeto Backend - Aceleração de Carreiras';
  }

}
