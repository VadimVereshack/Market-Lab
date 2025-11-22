import { ProductEntity } from "./product.entity";
import { BaseRepository } from '@shared/interfaces/repository.interface'

export abstract class ProductRepository implements BaseRepository<ProductEntity>{
    abstract create(product: ProductEntity): Promise<ProductEntity>;
    abstract findAll(): Promise<ProductEntity[]>;
    abstract findById(id: string): Promise<ProductEntity | null>;
    abstract update(id: string, product: ProductEntity): Promise<ProductEntity>;
    abstract delete(id: string): Promise<void>;
  }
