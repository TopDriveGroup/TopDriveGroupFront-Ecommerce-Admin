export interface IQuote {
    typeDocumentId?: 'NIT' | 'Cedula de Ciudadania' | 'Cedula de Extranjeria' | 'Pasaporte';
    documentId?: string;
    userName?: string;
    lastName?: string;
    corporateName?: string;
    department?: 'Bogota D.C.' | 'Amazonas' | 'Antioquia' | 'Arauca' | 'Atlantico' | 'Bolivar' | 'Boyaca' | 'Caldas' | 'Caqueta' | 'Casanare' | 'Cauca' | 'Cesar' | 'Choco' | 'Cordoba' | 'Cundinamarca' | 'Guainia' | 'Guaviare' | 'Huila' | 'La Guajira' | 'Magdalena' | 'Meta' | 'Nariño' | 'Norte de Santander' | 'Putumayo' | 'Quindio' | 'Risaralda' | 'San Andres y Providencia' | 'Santander' | 'Sucre' | 'Tolima' | 'Valle del Cauca' | 'Vaupes' | 'Vichada';
    city?: string;
    address?: string;
    email: string;
    phone: string;
    comments: string;
    dateQuoteCreation?: string;
    typeQuote: 'Product' | 'Service';
    products?: {
        productId: string,
        description: string;
        brand: string;
        quantity: number;
        sellingPriceDistributorFinalUser: number;
    }[];
    service?: {
        description: string;
        quantity: number;
        sellingPriceDistributorFinalUser: number;
        serviceId: string,
    }[];
    isAcceptedConditions: boolean;
}