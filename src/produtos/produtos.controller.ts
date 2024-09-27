import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './entities/produto.entity';
import { ProdutoDTO } from './dto/produto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('path_imagem', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createProduto(
    @Body() produtoDTO: ProdutoDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Produto> {
    try {
      return await this.produtosService.createProduto(produtoDTO, file);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('path_imagem', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateProduto(
    @Param('id') id: number,
    @Body() produtoDTO: ProdutoDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Produto> {
    try {
      return await this.produtosService.updateProduto(id, produtoDTO, file);
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
