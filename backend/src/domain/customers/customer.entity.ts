import {
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerModel,
  CustomerAddress,
  CustomerStatus,
  CUSTOMER_STATUS
} from './types';

export class CustomerDomainEntity implements CustomerModel {
  public id: string;
  public userId: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public status: CustomerStatus;
  public address?: CustomerAddress;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    firstName: string,
    lastName: string,
    phone: string,
    status: CustomerStatus = CUSTOMER_STATUS.ACTIVE,
    address?: CustomerAddress,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.status = status;
    this.address = address;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(createDto: CreateCustomerDto): CustomerDomainEntity {
    return new CustomerDomainEntity(
      crypto.randomUUID(),
      createDto.userId,
      createDto.firstName,
      createDto.lastName,
      createDto.phone,
      CUSTOMER_STATUS.ACTIVE,
      createDto.address
    );
  }

  update(updateDto: UpdateCustomerDto): void {
    if (updateDto.firstName) this.firstName = updateDto.firstName;
    if (updateDto.lastName) this.lastName = updateDto.lastName;
    if (updateDto.phone) this.phone = updateDto.phone;
    if (updateDto.address) this.address = { ...this.address, ...updateDto.address };
    if (updateDto.status) this.status = updateDto.status;

    this.updatedAt = new Date();
  }

  activate(): void {
    this.status = CUSTOMER_STATUS.ACTIVE;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.status = CUSTOMER_STATUS.INACTIVE;
    this.updatedAt = new Date();
  }
}