export interface IPQRF {
    anonymousUser: 'Si' | 'No';
    typeOfApplication: 'congratulations' | 'request' | 'complaint' | 'grievance' | 'claim' | 'application' | 'suggestion';
    userName?: string;
    lastName?: string;
    corporateName?: string;
    typeApplicant?: 'Natural Person' | 'Legal Entity';
    typeDocumentId?: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    documentId?: string;
    fileNumber?: string;
    fileDate: string;
    issue: string;
    issueDescription: string;
    responseMedium: 'Correspondence Address' | 'Email';
    department?: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city?: string;
    correspondenceAddress?: string;
    email?: string;
    phone?: string;
    isAcceptedConditions: boolean;
}