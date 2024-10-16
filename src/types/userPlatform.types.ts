export interface IUserPlatform {
    id?: string;
    name: string;
    lastName: string;
    typeDocumentId: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    documentId: string;
    typeRole: 'CEO' | 'Director' | 'CTO' | 'Programador' | 'Validador' | 'Contador' | 'Auxiliar de contabilidad';
    logo?: string;
    permissions: ('Todos' | 'Creacion' | 'Actualizacion' | 'Consulta' | 'Validacion')[];
    department: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city: string;
    codeDane: string;
    subregionCodeDane: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    passwordResetCode?: string;
    passwordResetCodeDate?: Date;
    loginAttempts?: number;
    isBlocked?: boolean;  
    unlockCode?: string;
    expiresAt?: Date;
    isAcceptedConditions: boolean;
}