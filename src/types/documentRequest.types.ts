export interface IDocumentRequest {
    nameClient: string;
    typeDocumentId: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    documentId: string;
    email: string;
    phone: string;
    documentRequest: 'Rete IVA' | 'Rete ICA';
    documentFiscalYear: '2023' | '2022' | '2021';
    dateRequest: string;
}