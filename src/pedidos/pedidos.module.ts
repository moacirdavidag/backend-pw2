import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { PedidosRepository } from './pedidos.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService, PedidosRepository, PrismaService],
  exports: [PedidosService, PedidosRepository],
})
export class PedidosModule {}
