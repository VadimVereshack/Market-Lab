import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository as DomainCustomerRepository } from '@domain/customers/customer.repository';
import { CustomerDomainEntity } from '@domain/customers/customer.entity';
import { CustomerProfileOrmEntity } from './customer.entity';
import { CustomerStatus } from '@domain/customers/types';

@Injectable()
export class PostgresCustomerRepository extends DomainCustomerRepository {
  constructor(
    @InjectRepository(CustomerProfileOrmEntity)
    private readonly repository: Repository<CustomerProfileOrmEntity>,
  ) {
    super();
  }

  async findAll(): Promise<CustomerDomainEntity[]> {
    const ormEntities = await this.repository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    return ormEntities.map(this.toDomainEntity);
  }

  async findById(id: string): Promise<CustomerDomainEntity | null> {
    if (!id) return null;
    const ormEntity = await this.repository.findOne({
      where: { id },
      relations: ['user']
    });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async findByUserId(userId: string): Promise<CustomerDomainEntity | null> {
    const ormEntity = await this.repository.findOne({
      where: { user_id: userId },
      relations: ['user']
    });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async findByEmail(email: string): Promise<CustomerDomainEntity | null> {
    const ormEntity = await this.repository.findOne({
      where: { user: { email } },
      relations: ['user']
    });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async create(data: Partial<CustomerDomainEntity>): Promise<CustomerDomainEntity> {
    const ormEntity = this.toOrmEntity(data);
    const savedOrmEntity = await this.repository.save(ormEntity);
    return this.toDomainEntity(savedOrmEntity);
  }

  async update(id: string, data: Partial<CustomerDomainEntity>): Promise<CustomerDomainEntity | null> {
    if (!id) throw new Error('Customer ID is required for update');

    await this.repository.update(id, data);
    const updatedOrmEntity = await this.repository.findOne({
      where: { id },
      relations: ['user']
    });

    return updatedOrmEntity ? this.toDomainEntity(updatedOrmEntity) : null;
  }

  async delete(id: string): Promise<void> {
    if (!id) throw new Error('Customer ID is required for delete');
    await this.repository.delete(id);
  }

  // QueryableRepository methods
  async findOne(filter: Partial<CustomerDomainEntity>): Promise<CustomerDomainEntity | null> {
    const ormEntity = await this.repository.findOne({
      where: filter,
      relations: ['user']
    });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async findMany(filter: Partial<CustomerDomainEntity>): Promise<CustomerDomainEntity[]> {
    const ormEntities = await this.repository.find({
      where: filter,
      relations: ['user']
    });
    return ormEntities.map(this.toDomainEntity);
  }

  private toDomainEntity(ormEntity: CustomerProfileOrmEntity): CustomerDomainEntity {
    return new CustomerDomainEntity(
      ormEntity.id,
      ormEntity.user_id,
      ormEntity.firstName,
      ormEntity.lastName,
      ormEntity.phone,
      ormEntity.status as CustomerStatus,
      ormEntity.address || undefined,
      ormEntity.createdAt,
      ormEntity.updatedAt
    );
  }

  private toOrmEntity(domainEntity: Partial<CustomerDomainEntity>): CustomerProfileOrmEntity {
    const ormEntity = new CustomerProfileOrmEntity();

    if (domainEntity.id) ormEntity.id = domainEntity.id;
    if (domainEntity.userId) ormEntity.user_id = domainEntity.userId;
    if (domainEntity.firstName) ormEntity.firstName = domainEntity.firstName;
    if (domainEntity.lastName) ormEntity.lastName = domainEntity.lastName;
    if (domainEntity.phone) ormEntity.phone = domainEntity.phone;
    if (domainEntity.status) ormEntity.status = domainEntity.status;
    if (domainEntity.address) ormEntity.address = domainEntity.address;
    if (domainEntity.createdAt) ormEntity.createdAt = domainEntity.createdAt;
    if (domainEntity.updatedAt) ormEntity.updatedAt = domainEntity.updatedAt;

    return ormEntity;
  }
}