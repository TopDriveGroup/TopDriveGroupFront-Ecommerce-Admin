// INTERFACE DE ERRORES
export class ServiceError extends Error {
    constructor(code: number, message: string, errorMessage?: unknown) {
        super(message);
        this.code = code;
        this.errorMessage = errorMessage;
    }
    code: number;
    errorMessage?: unknown;
}