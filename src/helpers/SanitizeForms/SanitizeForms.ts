export const sanitizeInput = (input: string) => {
    return input.replace(/[<>"'/;()&|{}[\]$=\\`]/g, "");
};      // Tener en cuenta que no se implementó el "\" por warnings