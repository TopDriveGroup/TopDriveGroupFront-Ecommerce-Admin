export interface IUser {
    id: string;
    name?: string;
    corporateName?: string;
    lastName: string;
    typeDocument: 'NIT' | 'Cedula de Ciudadania' | 'Cédula de Extranjería' | 'Pasaporte';
    idDocument: string;
    verificationDigit?: string;
    profilePicture?: string;
    logo?: string;
    typeRole: 'CEO' | 'Moderador de atención al cliente' | 'CTO' | 'Desarrollador de software' | 'Financiador de programas' | 'Superadmin' | 'Administrador' | 'Vendedor' | 'Cajero' | 'Operativo' | 'Contador';
    codeCiiu?: string;
    email: string;
    password: string;
    phone: string;
    department: string;
    city: string;
    address: string;
    passwordResetCode?: string;
    passwordResetCodeDate?: Date;
    loginAttempts?: number;
    isBlocked?: boolean;
    unlockCode?: string;
    expiresAt?: Date;  
    isAcceptedConditions: boolean;
}