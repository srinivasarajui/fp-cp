import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import path = require('path');
import { AuthModule } from './auth.full';
import { CommonModule } from './common.full';
import { InvoiceModule } from './invoices.full';
import { OrderModule } from './orders.full';
import { ProofModule } from './proofs.full';
const port = process.env.PGPORT || '5432';
console.log([
  path.join(__dirname, '../../../apps/backend/src/**/*.full{.ts,.js}'),
]);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || 'localhost',
      port: +port,
      username: process.env.PGUSER || 'root',
      password: process.env.PGPASSWORD || 'root',
      database: process.env.PGDATABASE || 'fp-cp',
      entities: [path.join(__dirname, '/**/*.{entity,full}{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
    }),
    AuthModule,
    CommonModule,
    ProofModule,
    OrderModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
