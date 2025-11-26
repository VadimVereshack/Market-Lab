import {
  CreateSupplierDto,
  UpdateSupplierDto,
  SupplierModel,
  SupplierStatus,
  SUPPLIER_STATUS
} from './types';

export class SupplierDomainEntity implements SupplierModel {
  public id: string;
  public userId: string;
  public companyName: string;
  public registrationNumber: string;
  public address: string;
  public email: string;
  public phone: string;
  public documents: string[];
  public status: SupplierStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    companyName: string,
    registrationNumber: string,
    address: string,
    email: string,
    phone: string,
    documents: string[] = [],
    status: SupplierStatus = SUPPLIER_STATUS.PENDING,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.companyName = companyName;
    this.registrationNumber = registrationNumber;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.documents = documents;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(createDto: CreateSupplierDto): SupplierDomainEntity {
    return new SupplierDomainEntity(
      crypto.randomUUID(),
      createDto.userId,
      createDto.companyName,
      createDto.registrationNumber,
      createDto.address,
      createDto.email,
      createDto.phone,
      createDto.documents || [],
      SUPPLIER_STATUS.PENDING
    );
  }

  update(updateDto: UpdateSupplierDto): void {
    if (updateDto.companyName) this.companyName = updateDto.companyName;
    if (updateDto.registrationNumber) this.registrationNumber = updateDto.registrationNumber;
    if (updateDto.address) this.address = updateDto.address;
    if (updateDto.email) this.email = updateDto.email;
    if (updateDto.phone) this.phone = updateDto.phone;
    if (updateDto.documents) this.documents = updateDto.documents;
    if (updateDto.status) this.status = updateDto.status;

    this.updatedAt = new Date();
  }

  approve(): void {
    this.status = SUPPLIER_STATUS.APPROVED;
    this.updatedAt = new Date();
  }

  reject(): void {
    this.status = SUPPLIER_STATUS.REJECTED;
    this.updatedAt = new Date();
  }

  suspend(): void {
    this.status = SUPPLIER_STATUS.SUSPENDED;
    this.updatedAt = new Date();
  }

  isActive(): boolean {
    return this.status === SUPPLIER_STATUS.APPROVED;
  }

  canSupply(): boolean {
    return this.status === SUPPLIER_STATUS.APPROVED;
  }

  isPending(): boolean {
    return this.status === SUPPLIER_STATUS.PENDING;
  }

  addDocument(document: string): void {
    this.documents.push(document);
    this.updatedAt = new Date();
  }

  removeDocument(document: string): void {
    const index = this.documents.indexOf(document);
    if (index > -1) {
      this.documents.splice(index, 1);
      this.updatedAt = new Date();
    }
  }
}