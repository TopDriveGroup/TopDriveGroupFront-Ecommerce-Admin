export interface IService {
    _id?: string;
    nameService: string;
    sellingPrice?: number;
    barCode?: string;
    isDiscounted?: 'Si' | 'No';
    discountPercentage?: number;
    salesCount?: number;

    //RELACION CON OTRAS TABLAS
    branchId: string;
    userId?: string;
}