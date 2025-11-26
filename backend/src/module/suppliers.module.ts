import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierProfileOrmEntity } from '@infrastructure/database/postgres/suppliers/supplier.entity';
import { PostgresSupplierRepository } from '@infrastructure/database/postgres/suppliers/supplier.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierProfileOrmEntity])],
  providers: [
    {
      provide: 'SupplierRepository',
      useClass: PostgresSupplierRepository,
    },
  ],
  exports: ['SupplierRepository'],
})
export class SuppliersModule { }