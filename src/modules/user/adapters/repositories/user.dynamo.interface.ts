export interface UserDynamo {
  PK: string;
  email: string;
  name: string;
  password: string;
  isPasswordResetRequired: boolean;
  createdAt: string;
  updatedAt: string;
  pendingLoginCode?: string;
  pendingLoginCodeExpiresAt?: string;
}
