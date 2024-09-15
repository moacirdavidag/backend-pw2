import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriasRepository } from './categorias.repository';
import { Categoria } from './entities/categoria.entity';
import { CategoriaDTO } from './dto/categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private categoriasRepository: CategoriasRepository) {}

  async findAllCategorias(): Promise<Categoria[]> {
    return await this.categoriasRepository.findAllCategorias();
  }

  async findCategoriaById(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findCategoriaById(id);
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada!');
    }
    return categoria;
  }

  async createCategoria(categoriaDTO: CategoriaDTO): Promise<Categoria> {
    return await this.categoriasRepository.createCategoria(categoriaDTO);
  }

  async updateCategoria(id: number, categoriaDTO: CategoriaDTO): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findCategoriaById(id);
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada!');
    }
    return await this.categoriasRepository.updateCategoria(id, categoriaDTO);
  }

  async deleteCategoria(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findCategoriaById(id);
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada!');
    }
    return await this.categoriasRepository.deleteCategoria(id);
  }
}
