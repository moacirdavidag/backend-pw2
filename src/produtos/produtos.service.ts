import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutosRepository } from './produtos.repository';
import { Produto } from './entities/produto.entity';
import { ProdutoDTO } from './dto/produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private produtosRepository: ProdutosRepository) {}

  async findAllProdutos(): Promise<Produto[]> {
    return await this.produtosRepository.findAllProdutos();
  }

  async findProdutoById(id: number): Promise<Produto> {
    const produto = await this.produtosRepository.findProdutoById(id);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado!');
    }
    return produto;
  }

  async createProduto(produtoDTO: ProdutoDTO): Promise<Produto> {
    return await this.produtosRepository.createProduto(produtoDTO);
  }

  async updateProduto(id: number, produtoDTO: ProdutoDTO): Promise<Produto> {
    return await this.produtosRepository.updateProduto(id, produtoDTO);
  }

  async deleteProduto(id: number): Promise<Produto> {
    return await this.produtosRepository.deleteProduto(id);
  }
}
