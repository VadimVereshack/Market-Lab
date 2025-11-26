import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { CustomerDomainEntity } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto, UpdateCustomerDto, CUSTOMER_STATUS } from './types';


@Injectable()
export class CustomerService {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) { }

  async findAll(): Promise<CustomerDomainEntity[]> {
    return this.customerRepository.findAll();
  }

  async findById(id: string): Promise<CustomerDomainEntity> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async findByUserId(userId: string): Promise<CustomerDomainEntity> {
    const customer = await this.customerRepository.findByUserId(userId);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async create(createDto: CreateCustomerDto): Promise<CustomerDomainEntity> {
    const existingCustomer = await this.customerRepository.findByUserId(createDto.userId);
    if (existingCustomer) throw new ConflictException('Customer profile already exists for this user');

    const customer = CustomerDomainEntity.create(createDto);
    return this.customerRepository.create(customer);
  }

  async update(id: string, updateDto: UpdateCustomerDto): Promise<CustomerDomainEntity> {
    const customer = await this.findById(id);
    customer.update(updateDto);

    const updated = await this.customerRepository.update(id, {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      status: customer.status,
      address: customer.address,
      updatedAt: customer.updatedAt
    });

    if (!updated) throw new NotFoundException('Customer not found after update');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const customer = await this.findById(id);
    customer.deactivate();

    await this.customerRepository.update(id, {
      status: customer.status,
      updatedAt: customer.updatedAt
    });
  }

  async activate(id: string): Promise<CustomerDomainEntity> {
    return this.update(id, { status: CUSTOMER_STATUS.ACTIVE });
  }

  async deactivate(id: string): Promise<CustomerDomainEntity> {
    return this.update(id, { status: CUSTOMER_STATUS.INACTIVE });
  }

  async findOne(filter: Partial<CustomerDomainEntity>): Promise<CustomerDomainEntity | null> {
    return this.customerRepository.findOne(filter);
  }

  async findMany(filter: Partial<CustomerDomainEntity>): Promise<CustomerDomainEntity[]> {
    return this.customerRepository.findMany(filter);
  }
}