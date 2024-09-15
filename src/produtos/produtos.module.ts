import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { ProdutosRepository } from './produtos.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, ProdutosRepository, PrismaService],
  exports: [ProdutosService, ProdutosRepository],
})
export class ProdutosModule {}
