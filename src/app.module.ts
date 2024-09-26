import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PedidosModule,
    ProdutosModule,
    CategoriasModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '/public'),
      serveRoot: '/public/'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
