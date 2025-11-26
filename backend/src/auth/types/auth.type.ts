export const ROLES = {
  CUSTOMER: 'customer',
  SUPPLIER: 'supplier',
  ADMIN: 'admin'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export interface UserPayload {
  id: string;
  email: string;
  roles: Role[];
}

export interface SessionUser extends UserPayload {
  name?: string;
  permissions?: string[];
}

export interface ValidateUserResponse {
  success: boolean;
  message?: string;
  payload?: UserPayload;
}

export interface AuthRequest extends Request {
  user: SessionUser;
}

