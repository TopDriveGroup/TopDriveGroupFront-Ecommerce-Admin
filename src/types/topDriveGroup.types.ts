export interface ITopDriveGroup {
    id?: string;
    corporateName: string;
    corporateTypeDocumentId: 'NIT';
    corporateDocumentId: string;
    corporateVerificationDigit: string;
    typeRole: 'Company';
    logo?: string;
    permissions: 'Todos';
    department: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city: string;
    codeDane: string;
    subregionCodeDane: string;
    address: string[];
    phone: string[];
    email: string;
    password: string;
    passwordResetCode?: string;
    passwordResetCodeDate?: Date;
    loginAttempts?: number;
    isBlocked?: boolean;  
    unlockCode?: string;
    expiresAt?: Date;
}