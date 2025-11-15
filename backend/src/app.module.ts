import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

// import { AuthModule } from '@auth/auth.module';
// import { ProductsModule } from '@module/product.module';
// import { ClientsModule } from '@module/clients.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGO_URI || ''),

    // AuthModule,
    // ClientsModule,
    // ProductsModule,
  ],
  providers: [],
})
export class AppModule { }
