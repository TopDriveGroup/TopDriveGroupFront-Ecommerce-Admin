/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import * as XLSX from 'xlsx';
//REDUX
import { useDispatch } from 'react-redux';
import { postManyProducts } from '../../../../redux/PanelTopDriveGroup/02Product/actions';
import type { AppDispatch } from '../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../types/product.types';
import NavBar from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function CreateManyProductTopDriveGroupPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    // const navigate = useNavigate();
    // const [shouldNavigate, setShouldNavigate] = useState(false);

    const [excelData, setExcelData] = useState<Array<{ [key: string]: any }> | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target?.result as string;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const parsedData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                const spanishColumnNames: { [key: string]: string } = {
                    "Código SAP": "itemCode",
                    "Descripción del artículo": "itemName",
                    "Código grupo": "itemsGroupCode",
                    "Grupo": "itemsGroup",
                    "Referencia": "supplierCatalogNo",
                    "Código fabricante": "manufacturerCode",
                    "Descripción del fabricante": "manufacturerDescription",
                    "Unidad de medida": "unitMeasure",
                    "En stock": "inStockBODCELMP",
                    "Comprometido": "committedBODCELMP",
                    "Precio": "sellingPrice",
                    "Imagen principal": "mainImage",
                    "Imagen secundaria": "secondaryImage",
                };

                const originalHeaders: string[] = parsedData[0] || [];
                const currentHeaders: string[] = originalHeaders.map((header: string) => {
                    return spanishColumnNames[header] || header;
                });
                if (currentHeaders.length > 0) {
                    setHeaders(currentHeaders);
                    const dataRows = parsedData.slice(1).map(row => {
                        const rowData: { [key: string]: any } = {};
                        row.forEach((cell: any, index: number) => {
                            rowData[currentHeaders[index]] = cell;
                        });
                        return rowData;
                    });
                    setExcelData(dataRows);
                } else {
                    console.error('No se encontraron encabezados válidos en el archivo Excel.');
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    // Función para traducir los nombres de las columnas de inglés a español
    const englishToSpanishColumnNames: { [key: string]: string } = {
        "itemCode": "Código SAP",
        "itemName": "Descripción del artículo",
        "itemsGroupCode": "Código grupo",
        "itemsGroup": "Grupo",
        "supplierCatalogNo": "Referencia",
        "manufacturerCode": "Código fabricante",
        "manufacturerDescription": "Descripción del fabricante",
        "unitMeasure": "Unidad de medida",
        "inStockBODCELMP": "En stock",
        "committedBODCELMP": "Comprometido",
        "sellingPrice": "Precio",
        "mainImage": "Imagen principal",
        "secondaryImage": "Imagen secundaria",
    };

    // Función para preparar los datos del formulario antes de enviarlos a Redux
    const prepareFormData = (excelData: any[]) => {
        if (!excelData) return [];

        const nonEmptyRows = excelData.filter(row => Object.values(row).some(value => !!value));

        return nonEmptyRows.map(product => {        
            const productPrepare: IProduct = {
                itemCode: product.itemCode,
                itemName: product.itemName,
                itemsGroupCode: product.itemsGroupCode,
                itemsGroup: product.itemsGroup,
                supplierCatalogNo: product.supplierCatalogNo,
                manufacturerCode: product.manufacturerCode,
                manufacturerDescription: product.manufacturerDescription,
                unitMeasure: product.unitMeasure,                
                inStockBODCELMP: product.inStockBODCELMP,
                committedBODCELMP: product.committedBODCELMP,
                sellingPrice: product.sellingPrice,
                mainImage: product.mainImage,
                secondaryImage: product.secondaryImage,
            };
            return productPrepare;
        });
    };

    // useEffect(() => {
    //     if (shouldNavigate) {
    //         navigate('/panel-top-drive-group/products/consult');
    //     }
    // }, [shouldNavigate, navigate]);

    const onSubmit = async () => {
        if (excelData) {
            const formData = prepareFormData(excelData);
            await dispatch(postManyProducts(formData, token));
            setMessage('Los productos se han creado correctamente.');
            // setShouldNavigate(true);
        } else {
            setMessage('No se han encontrado datos válidos para procesar.');
        }
    };

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <h2 className={`${styles.main__Title} mb-3 text-start}`}>Crear productos masivamente</h2>

                    <div className={`${styles.container__Product} m-auto d-flex flex-column align-items-center justify-content-between gap-4`}>
                        <div className={`${styles.containerDownloadFile} mt-3 mb-3 p-2 d-flex align-items-center justify-content-between border rounded`}>
                            <h6 className='m-0 text-center'>Primero descarga el archivo para que lo diligencies</h6>
                            <a className={`${styles.downloadFile} text-center text-decoration-none`} href="/DownloadExcels/Creacion_Masiva_De_Productos.xlsx" download="Creacion_Masiva_De_Productos.xlsx">Descargar Excel</a>
                        </div>
                        <div className="d-flex">
                            <input type="file" accept=".xlsx" onChange={handleFileUpload} className="m-auto p-1 border rounded text-decoration-none" />
                        </div>
                        <div className={`${styles.success} m-auto position-relative`}>
                            {message && (
                                <p className={`${styles.successMessage} p-1 text-center text-success position-absolute w-100`}>{message}</p>
                            )}
                        </div>
                        <div className="mt-4 table-responsive">
                            {excelData && (
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            {headers.map((header) => (
                                                <th key={header} className="align-middle text-center">
                                                    {englishToSpanishColumnNames[header] || header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {excelData.map((row, index) => (
                                            Object.values(row).some(value => !!value) && (
                                                <tr key={index}>
                                                    {headers.map((header, columnIndex) => (
                                                        <td key={columnIndex} className="align-middle text-center">{row[header]}</td>
                                                    ))}
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="d-flex">
                            <button className={`${styles.button__Submit} m-auto border-0 rounded text-decoration-none`} type='button' onClick={onSubmit}>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateManyProductTopDriveGroupPage;