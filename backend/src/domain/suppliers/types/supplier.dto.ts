// Use it to type the incoming data
import { SupplierStatus } from './supplier.type';

export interface CreateSupplierDto {
  userId: string;
  companyName: string;
  registrationNumber: string;
  address: string;
  email: string;
  phone: string;
  documents?: string[];
}

export interface UpdateSupplierDto extends Partial<Omit<CreateSupplierDto, 'userId'>> {
  status?: SupplierStatus;
}