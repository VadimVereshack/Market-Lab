import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '@auth/auth.module';
import { DatabaseModule } from '@system/database.module';

import { UsersModule } from '@module/users.module';
import { CustomersModule } from '@module/customers.module';
import { SuppliersModule } from '@module/suppliers.module';
import { ProductModule } from '@module/product.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGO_URI || ''),

    DatabaseModule,
    AuthModule,

    UsersModule,
    CustomersModule,
    SuppliersModule,
    ProductModule,
  ],
  providers: [],
})
export class AppModule { }
