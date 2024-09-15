import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidoDTO } from './dto/pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @Get()
  async findAllPedidos(): Promise<Pedido[]> {
    try {
        return await this.pedidosService.findAllPedidos();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/:id')
  async findPedidoById(@Param('id') id: number): Promise<Pedido> {
    try {
        return await this.pedidosService.findPedidoById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async createPedido(@Body() pedidoDTO: PedidoDTO): Promise<Pedido> {
    try {
        return await this.pedidosService.createPedido(pedidoDTO);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('/:id')
  async updatePedido(@Param('id') id: number, @Body() pedidoDTO: PedidoDTO): Promise<Pedido>{
    try {
        return await this.pedidosService.updatePedido(Number(id), pedidoDTO);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('/:id')
  async deletePedido(@Param('id') id: number): Promise<Pedido>{
    try {
        return await this.pedidosService.deletePedido(Number(id));
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
