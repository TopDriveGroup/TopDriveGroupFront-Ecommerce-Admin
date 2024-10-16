export interface IOrderWebCheckout {
    buyer: {
        name: string;
        surname: string,
        email: string,
        document: string,
        documentType: string,
        mobile: number,
    };
    payment: {
        reference: string;
        description: string,
        amount: {
            currency: string,
            total: number,
        },
    };
    expiration: string;
    ipAddress: string;
    returnUrl: string;
    userAgent: string;
    paymentMethod: string;
}



// {
    // "buyer": {
    //     "name": "Effie",
    //     "surname": "Brekke",
    //     "email": "dnetix@yopmail.com",
    //     "document": "1040035000",
    //     "documentType": "CC",
    //     "mobile": 3006108300
    // },
    // "payment": {
    //     "reference": "TEST_20240826_112056",
    //     "description": "Voluptas enim voluptates iste eveniet excepturi et ut.",
    //     "amount": {
    //         "currency": "COP",
    //         "total": 111000
    //     }
    // },
//     "expiration": "2024-08-27T11:20:56-05:00",
//     "ipAddress": "190.85.112.34",
//     "returnUrl": "https://dnetix.co/p2p/client",
//     "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
//     "paymentMethod": ""
// }