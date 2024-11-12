import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getAllProduct } from '../../../../redux/PanelTopDriveGroup/02Product/actions';
import { IProduct, IProductsOrdered } from '../../../../types/product.types';
import NavBar from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Loading from '../../../../components/GeneralComponents/ComponentLoading/Loading';
import Paginated from '../../../../components/GeneralComponents/Paginated/Paginated';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function ProductsSapTopDriveGroupPage() {
    const dispatch: AppDispatch = useDispatch();
    const { products, loading, errorProduct, totalProducts } = useSelector((state: RootState) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(100);

    useEffect(() => {
        dispatch(getAllProduct(currentPage, itemsByPage));
    }, [dispatch, currentPage, itemsByPage]);

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

    const handleItemsByPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsByPage(Number(event.target.value));
        setCurrentPage(1);  // Reinicia la página al cambiar el número de items por página
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4 d-flex flex-column align-items-start justify-content-start`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Productos de SAP</h2>
                    {loading ? (
                        <div className={`${styles.container__Loading} d-flex align-items-center justify-content-center`}>
                            <Loading />
                        </div>
                    ) : errorProduct ? (
                        <p>Error: {errorProduct.join(', ')}</p>
                    ) : (
                        <div>
                            <div className={`${styles.container__Paginated} d-flex align-items-center justify-content-end gap-2`}>
                                <Paginated
                                    totalProducts={totalProducts}
                                    limit={itemsByPage}
                                    onPageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                                <div className={`${styles.container__Items_By_page} d-flex align-items-center justify-content-center`}>
                                    <span>Ver:</span>
                                    <div className={`${styles.select__Items_By_page} mx-2`}>
                                        <select
                                            className={`${styles.select} p-1 border-0`}
                                            value={itemsByPage}
                                            onChange={handleItemsByPage}
                                        >
                                            <option value={100}>100</option>
                                            <option value={500}>500</option>
                                            <option value={1000}>1000</option>
                                        </select>
                                    </div>
                                    <span>por página</span>
                                </div>
                            </div>
                            <table className={`${styles.productTable}`}>
                                <thead className={`${styles.header}`}>
                                    <tr className={`${styles.container__Titles}`}>
                                        <th className={`${styles.titles} p-2`}>En SAP</th>
                                        <th className={`${styles.titles} p-2`}>Faltante en SAP</th>
                                    </tr>
                                </thead>
                                <tbody className={`${styles.body}`}>
                                    {productsOrdered.map(({ code, type }, index) => (
                                        <tr key={`${code}-${index}`} className={`${styles.container__Data}`}>
                                            <td className={`${styles.data__In_Sap} d-flex flex-column align-items-start justify-content-start`}>
                                                <span className={`${styles.itemCode} p-1`}>{type === 'enSAP' ? `Producto: ${code}` : ''}</span>
                                            </td>
                                            <td className={`${styles.data} mb-2 p-1`}>{type === 'faltante' ? `Producto: ${code}` : ''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductsSapTopDriveGroupPage;