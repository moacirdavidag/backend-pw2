import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PedidoDTO } from "./dto/pedido.dto";

@Injectable()
export class PedidosRepository {
    constructor(private prisma: PrismaService) {}

    async findAllPedidos() {}

    async findPedidoById(id: number) {}

    async createPedido(pedidoDTO: PedidoDTO) {}

    async updatePedido(id: number, pedidoDTO: PedidoDTO) {}

    async deletePedido(id: number, pedidoDTO: PedidoDTO) {}
}