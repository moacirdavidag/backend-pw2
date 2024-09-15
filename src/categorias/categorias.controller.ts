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
import { CategoriasService } from './categorias.service';
import { Categoria } from './entities/categoria.entity';
import { CategoriaDTO } from './dto/categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Get()
  async findAllCategorias(): Promise<Categoria[]> {
    try {
      return await this.categoriasService.findAllCategorias();
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:id')
  async findCategoriaById(@Param('id') id: number): Promise<Categoria> {
    try {
      return await this.categoriasService.findCategoriaById(Number(id));
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async createCategoria(
    @Body() categoriaDTO: CategoriaDTO,
  ): Promise<Categoria> {
    try {
      return await this.categoriasService.createCategoria(categoriaDTO);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  async updateCategoria(
    @Param('id') id: number,
    @Body() categoriaDTO: CategoriaDTO,
  ): Promise<Categoria> {
    try {
      return await this.categoriasService.updateCategoria(Number(id), categoriaDTO);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  async deleteCategoria(
    @Param('id') id: number,
  ): Promise<Categoria> {
    try {
      return await this.categoriasService.deleteCategoria(Number(id));
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

}
