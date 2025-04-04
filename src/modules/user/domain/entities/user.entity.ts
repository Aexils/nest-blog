export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public password: string,
    public isPasswordResetRequired: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public pendingLoginCode?: string,
    public pendingLoginCodeExpiresAt?: Date
  ) {}
}
