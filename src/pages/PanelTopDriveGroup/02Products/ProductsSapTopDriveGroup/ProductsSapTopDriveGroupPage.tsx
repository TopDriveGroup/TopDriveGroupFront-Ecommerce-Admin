import { useEffect, useMemo } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../../redux/PanelTopDriveGroup/02Product/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IProduct, IProductsOrdered } from '../../../../types/product.types';
import NavBar from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import styles from './styles.module.css';

function ProductsSapTopDriveGroupPage() {
    const token = jsCookie.get("token");
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        if (token) {
            try {
                dispatch(getAllProduct(token));
            } catch (error) {
                console.error('Error al traer los productos', error);
            }
        }
    }, [dispatch, token]);

    const productsOrdered = useMemo(() => {
        const itemCodesPresent = Array.isArray(products)
            ? products.map((product: IProduct) => parseInt(product.itemCode, 10))
            : [];

        const minCode = Math.min(...itemCodesPresent);
        const maxCode = Math.max(...itemCodesPresent);

        const enSAP: IProductsOrdered[] = Array.isArray(products)
            ? products.map((product: IProduct) => ({ code: product.itemCode, type: 'enSAP', product }))
            : [];

        const faltantes: IProductsOrdered[] = [];
        for (let code = minCode; code <= maxCode; code++) {
            if (!itemCodesPresent.includes(code)) {
                faltantes.push({ code: code.toString().padStart(7, '0'), type: 'faltante' });
            }
        }

        const combinedCodes: IProductsOrdered[] = [
            ...enSAP,
            ...faltantes
        ];

        return combinedCodes.sort((a, b) => parseInt(a.code) - parseInt(b.code));
    }, [products]);

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4 d-flex flex-column align-items-start justify-content-start`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Productos de SAP</h2>
                    <table className={`${styles.productTable}`}>
                        <thead className={`${styles.header}`}>
                            <tr className={`${styles.container__Titles} `}>
                                <th className={`${styles.titles} p-2`}>En SAP</th>
                                <th className={`${styles.titles} p-2`}>Faltante en SAP</th>
                            </tr>
                        </thead>
                        <tbody className={`${styles.body} `}>
                            {productsOrdered.map(({ code, type, product }, index) => (
                                <tr key={index} className={`${styles.container__Data} `}>
                                    <td className={`${styles.data__In_Sap} d-flex flex-column align-items-start justify-content-start`}>
                                        <span className={`${styles.itemCode} p-1`}>{type === 'enSAP' ? `Producto: ${code}` : ''} {}</span>
                                        <div className={`${styles.container__Columns} d-flex flex-column`}>
                                            <div className={`${styles.column__Top} mb-4 d-flex flex-column align-items-start justify-content-start`}>
                                                <p className='m-0'>Stock - Entrega de 2 a 4 días hábiles</p>
                                                <p className='m-0'>Stock: {(product?.inStockBODCELMP || 0) + (product?.inStockBODCOT01 || 0) + (product?.inStockBODCOT02 || 0) + (product?.inStockBODZF04 || 0) + (product?.inStockBODZF05 || 0) + (product?.inStockBOGCALI || 0)}</p>
                                                <p className='m-0'>Comprometido: {(product?.committedBODCELMP || 0) + (product?.committedBODCOT01 || 0) + (product?.committedBODCOT02 || 0) + (product?.committedBODZF04 || 0) + (product?.committedBODZF05 || 0) + (product?.committedBOGCALI || 0)}</p>
                                                <div className={`${styles.dup} d-flex flex-column align-items-start justify-content-start w-100`}>
                                                    <div className='d-flex w-100'>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Stock Celta: ${product?.inStockBODCELMP || 0}` : 0}</span>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Comprom Celta: ${product?.committedBODCELMP || 0}` : 0}</span>
                                                        <span className={`${styles.row__Total} p-1`}>Total: {(product?.inStockBODCELMP || 0) - (product?.committedBODCELMP || 0)}</span>
                                                    </div>
                                                    <div className='d-flex w-100'>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Stock Cota Ppal: ${product?.inStockBODCOT01 || 0}` : 0}</span>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Comprom Cota Ppal: ${product?.committedBODCOT01 || 0}` : 0}</span>
                                                        <span className={`${styles.row__Total} p-1`}>Total: {(product?.inStockBODCOT01 || 0) - (product?.committedBODCOT01 || 0)}</span>
                                                    </div>
                                                    <div className='d-flex w-100'>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Stock Cota Mzz: ${product?.inStockBODCOT02 || 0}` : 0}</span>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Comprom Cota Mzz: ${product?.committedBODCOT02 || 0}` : 0}</span>
                                                        <span className={`${styles.row__Total} p-1`}>Total: {(product?.inStockBODCOT02 || 0) - (product?.committedBODCOT02 || 0)}</span>
                                                    </div>
                                                    <div className='d-flex w-100'>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Stock Intex Nacionalizado: ${product?.inStockBODZF04 || 0}` : 0}</span>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Comprom Intex Nacionalizado: ${product?.committedBODZF04 || 0}` : 0}</span>
                                                        <span className={`${styles.row__Total} p-1`}>Total: {(product?.inStockBODZF04 || 0) - (product?.committedBODZF04 || 0)}</span>
                                                    </div>
                                                    <div className='d-flex w-100'>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Stock Carta Nacionalizado: ${product?.inStockBODZF05 || 0}` : 0}</span>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Comprom Carta Nacionalizado: ${product?.committedBODZF05 || 0}` : 0}</span>
                                                        <span className={`${styles.row__Total} p-1`}>Total: {(product?.inStockBODZF05 || 0) - (product?.committedBODZF05 || 0)}</span>
                                                    </div>
                                                    <div className='d-flex w-100'>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Stock Cali: ${product?.inStockBOGCALI || 0}` : 0}</span>
                                                        <span className={`${styles.row} p-1`}>{type === 'enSAP' ? `Comprom Cali: ${product?.committedBOGCALI || 0}` : 0}</span>
                                                        <span className={`${styles.row__Total} p-1`}>Total: {(product?.inStockBOGCALI || 0) - (product?.committedBOGCALI || 0)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`${styles.column__Bottom} d-flex flex-column align-items-start justify-content-start`}>
                                                <p className='m-0'>Por nacionalizar - Entrega de 4 a 6 semanas</p>
                                                <p className='m-0'>Stock: {(product?.inStockBODINT || 0) + (product?.inStockBODZF01 || 0) + (product?.inStockBODZF02 || 0) + (product?.inStockBODZF03 || 0)}</p>
                                                <p className='m-0'>Comprometido: {(product?.committedBODINT || 0) + (product?.committedBODZF01 || 0) + (product?.committedBODZF02 || 0) + (product?.committedBODZF03 || 0)}</p>
                                                <div className={`${styles.dup__Right} d-flex flex-column align-items-start justify-content-start w-100`}>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Stock Bdga Int Fisico: ${product?.inStockBODINT || 0}` : 0}</span>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Stock ZF Bogotá: ${product?.inStockBODZF01 || 0}` : 0}</span>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Stock ZF Cartagena: ${product?.inStockBODZF02 || 0}` : 0}</span>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Stock ZF Intex Cota: ${product?.inStockBODZF03 || 0}` : 0}</span>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Comprom Bdga Int Fisico: ${product?.committedBODINT || 0}` : 0}</span>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Comprom ZF Bogotá: ${product?.committedBODZF01 || 0}` : 0}</span>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Comprom ZF Cartagena: ${product?.committedBODZF02 || 0}` : 0}</span>
                                                    <span className={`${styles.row__Right} p-1`}>{type === 'enSAP' ? `Comprom ZF Intex Cota: ${product?.committedBODZF03 || 0}` : 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`${styles.data} mb-2 p-1`}>{type === 'faltante' ? `Producto: ${code}` : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductsSapTopDriveGroupPage;