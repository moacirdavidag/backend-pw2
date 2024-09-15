import { Injectable, NotFoundException } from '@nestjs/common';
import { PedidosRepository } from './pedidos.repository';
import { Pedido } from './entities/pedido.entity';
import { PedidoDTO } from './dto/pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private pedidosRepository: PedidosRepository) {}

  async findAllPedidos(): Promise<Pedido[]> {
    return await this.pedidosRepository.findAllPedidos();
  }

  async findPedidoById(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findPedidoById(id);
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    return pedido;
  }

  async createPedido(pedidoDTO: PedidoDTO): Promise<Pedido> {
    return await this.pedidosRepository.createPedido(pedidoDTO);
  }

  async updatePedido(id: number, pedidoDTO: PedidoDTO): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findPedidoById(id);
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    return await this.pedidosRepository.updatePedido(id, pedidoDTO);
  }

  async deletePedido(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findPedidoById(id);
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    return await this.pedidosRepository.deletePedido(id);
  }
}
