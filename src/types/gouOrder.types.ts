/* eslint-disable @typescript-eslint/no-explicit-any */
//INTERRACE PARA ENVIAR LA DATA A CREAR SESION EN GOU
export interface IGouOrderRequest {
    locale: string;
    buyer: {
        document: string;
        documentType: string;
        name: string;
        surname: string;
        company: string;
        email: string;
        mobile: number;
        address?: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
        };
    };
    payment: {
        reference: string | null;
        description: string;
        amount: {
            currency: string;
            total: number;
            taxes?: {
                kind?: string;
                amount?: number;
                base?: number;
            } [];
            details?: {
                kind?: string;
                amount?: number;
            }[];
        };
        items: {
            sku: string;
            name: string;
            category: string;
            qty: number;
            price: number;
            tax: number;
        }[];
    };
    expiration?: null | string;
    ipAddress?: null | string;
    userAgent: string;
    returnUrl?: string,
    cancelUrl?: string;
    skipResult: boolean;
    noBuyerFill: boolean;
    captureAddress: boolean;
    paymentMethod?: string | null;
}


//RESPUESTA DE SESION EN GOU
// Interfaz de respuesta con las propiedades necesarias
export interface IGouOrderResponse {
    status: {
        status: string;
        reason: string;
        message: string;
        date: Date;  // Cambié a string ya que normalmente las fechas vienen como string
    };
    requestId: number;
    processUrl: string;
    transactionId?: string;
    locale: string;
    buyer: {
        document: string;
        documentType: string;
        name: string;
        surname: string;
        company: string;
        email: string;
        mobile: number;
        address?: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string;
        };
    };
    payment: {
        reference: string | null;
        description: string;
        amount: {
            currency: string;
            total: number;
            taxes?: {
                kind?: string;
                amount?: number;
                base?: number;
            }[];
            details?: {
                kind?: string;
                amount?: number;
            }[];
        };
        items: {
            sku: string;
            name: string;
            category: string;
            qty: number;
            price: number;
            tax: number;
        }[];
    };
    expiration?: string | null;
    ipAddress?: string | null;
    userAgent: string;
    returnUrl?: string;
    cancelUrl?: string;
    skipResult: boolean;
    noBuyerFill: boolean;
    captureAddress: boolean;
    paymentMethod?: string | null;


    result?: {
        requestId: string;
        processUrl: string;
        status: {
            status: string;
            message: string;
            date: string;
        };
        request: {
            buyer: {
                name: string;
                email: string;
                address: {
                    street: string;
                    city: string;
                    state: string;
                    postalCode: string;
                };
            };
            payment: {
                reference: string | null;
                description: string;
                amount: {
                    currency: string;
                    total: number;
                };
                items: {
                    sku: string;
                    name: string;
                    qty: number;
                    price: number;
                }[];
            };
        };
        payment: {
            paymentMethodName: string;
            authorization: string;
            receipt: string;
            status: {
                status: string;
            };
            amount: {
                to: {
                    total: number;
                    currency: string;
                };
            };
        }[];
    };
}


export interface IGouOrderResult {
    code: number;
    requestId?: string;
    result: {
        requestId: number;
        processUrl?: string;
        status: {
            status: string;
            reason: string;
            message: string;
            date: string;
        };
        request: {
            locale: string;
            buyer: {
                document: string;
                documentType: string;
                name: string;
                surname: string;
                email: string;
                mobile: string | number;
                company: string;
                address: {
                    street: string;
                    city: string;
                    state: string;
                    postalCode: string;
                    phone: string;
                };
            };
            payer: {
                document: string;
                documentType: string;
                name: string;
                surname: string;
                email: string;
                mobile: string;
            };
            payment: {
                reference: string;
                description: string;
                amount: {
                    currency: string;
                    total: number;
                };
                allowPartial: boolean;
                items: Array<{
                    sku: string;
                    name: string;
                    category: string;
                    qty: number;
                    price: number;
                    tax: number;
                }>;
                subscribe: boolean;
            };
            fields: Array<{
                keyword: string;
                value: string | number;
                displayOn: string;
            }>;
            returnUrl: string;
            ipAddress: string;
            userAgent: string;
            expiration: string;
        };
        payment: Array<{
            amount: {
                to: {
                    total: number;
                    currency: string;
                };
                from: {
                    total: number;
                    currency: string;
                };
                factor: number;
            };
            status: {
                date: string;
                reason: string;
                status: string;
                message: string;
            };
            receipt: string;
            refunded: boolean;
            franchise: string;
            reference: string;
            issuerName: string;
            authorization: string;
            paymentMethod: string;
            processorFields: Array<{
                value: string | number;
                keyword: string;
                displayOn: string;
            }>;
            internalReference: number;
            paymentMethodName: string;
        }>;
        subscription: null | any;
    };
    processUrl?: string;
}