import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './entities/produto.entity';
import { ProdutoDTO } from './dto/produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Get()
  async findAllProdutos(): Promise<Produto[]> {
    try {
      return await this.produtosService.findAllProdutos();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:id')
  async findProdutoById(@Param('id') id: number): Promise<Produto> {
    try {
      return await this.produtosService.findProdutoById(Number(id));
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async createProduto(@Body() produtoDTO: ProdutoDTO): Promise<Produto> {
    try {
      return await this.produtosService.createProduto(produtoDTO);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  async updateProduto(@Param('id') id: number, @Body() produtoDTO: ProdutoDTO): Promise<Produto> {
    try {
      return await this.produtosService.updateProduto(id, produtoDTO);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  async deleteProduto(@Param('id') id: number): Promise<Produto> {
    try {
      return await this.produtosService.deleteProduto(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
