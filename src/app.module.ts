import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [UsersModule, AuthModule, PedidosModule, ProdutosModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
