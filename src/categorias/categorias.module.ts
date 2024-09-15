import { Module } from "@nestjs/common";
import { CategoriasController } from "./categorias.controller";
import { CategoriasService } from "./categorias.service";
import { CategoriasRepository } from "./categorias.repository";
import { PrismaService } from "src/database/prisma.service";

@Module({
    controllers: [CategoriasController],
    providers: [CategoriasService, CategoriasRepository, PrismaService],
    exports: [CategoriasService, CategoriasRepository]
})
export class CategoriasModule {}