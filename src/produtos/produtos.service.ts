import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutosRepository } from './produtos.repository';
import { Produto } from './entities/produto.entity';
import { ProdutoDTO } from './dto/produto.dto';
import path from 'path';

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

  async createProduto(produtoDTO: ProdutoDTO, imagem: Express.Multer.File): Promise<Produto> {
    let path_imagem = "";

    if(imagem) {
      path_imagem = imagem.filename;
    }

    return await this.produtosRepository.createProduto({...produtoDTO, path_imagem: path_imagem !== "" ? path_imagem : ""
    });
  }

  async updateProduto(id: number, produtoDTO: ProdutoDTO, imagem: Express.Multer.File): Promise<Produto> {
    let path_imagem = "";
    const produto = await this.produtosRepository.findProdutoById(Number(id));
    if(!produto) {
      throw new NotFoundException("Produto não encontrado!");
    }
    if(imagem) {
      path_imagem = imagem.filename;
    }
    return await this.produtosRepository.updateProduto(id, {...produtoDTO, path_imagem: path_imagem !== "" ? path_imagem : produto.path_imagem});
  }

  async deleteProduto(id: number): Promise<Produto> {
    return await this.produtosRepository.deleteProduto(id);
  }
}
