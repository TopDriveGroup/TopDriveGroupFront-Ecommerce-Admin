/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getProductByQr } from '../../../../redux/Landing/productSlice/actions';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../types/product.types';
import styles from './styles.module.css';

function DetailProductByQrPage() {
    const { idProduct } = useParams<{ idProduct: string }>();
    const dispatch: AppDispatch = useDispatch();

    // ESTADO DE REDUX
    const productQr = useSelector((state: RootState) => state.products.products);
    const [productbyQr, setProductbyQr] = useState<IProduct | undefined>(undefined);

    useEffect(() => {
        if (idProduct) {
            dispatch(getProductByQr(idProduct));
        }
    }, [idProduct, dispatch]);

    useEffect(() => {
        if (productQr && 'sap' in productQr) {
            // productQr es un solo IProduct
            setProductbyQr(productQr as IProduct);
        } else if (Array.isArray(productQr) && productQr.length > 0) {
            // productQr es un array, elige el primer producto si es necesario
            setProductbyQr(productQr[0]);
        } else {
            setProductbyQr(undefined);
        }
    }, [productQr]);

    return (
        <div className={`${styles.container} mt-2`}>
            <h1 className={`${styles.main__Title} m-0`}>Detalles del Producto</h1>

            <div className='mb-4'>
                <h5 className={`${styles.secundary__Title} mb-3`}>Información básica</h5>
                <div className={`${styles.meta__Data} mb-4 d-flex align-items-center justify-content-between gap-4`}>
                    <div className={`${styles.container__Images} d-flex align-items-center justify-content-between gap-5`}>
                        <img src={productbyQr?.mainImage} alt="Imagen principal" className={`${styles.image} `}/>
                        <img src={productbyQr?.secondaryImage} alt="Imagen secundaria" className={`${styles.image} `}/>
                    </div>
                    <div className={`${styles.code__Meta_Data} d-flex flex-column align-items-center justify-content-center`}>
                        <h6 className='m-0'>QR del producto</h6>
                        <img src={productbyQr?.qrCodeLink} alt="QR Code" className={styles.image__Qr} />
                    </div>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Código SAP</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.sap}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Nombre del producto</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.description}</p>
                </div>

                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Descripción del fabricante:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.descriptionManufacturer}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Clase:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.class}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Categoría:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.category}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Tipo:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.type}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Fabricante:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.manufacturer}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Unidad de medida:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.unitMeasure}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Familia:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.family}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Serie:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.series}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Referencia:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.reference}</p>
                </div>
            </div>

            <div className='mb-4'>
                <h5 className={`${styles.secundary__Title} m-0`}>Características eléctricas</h5>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Frecuencia:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.frequency}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Tipo de tensión:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.tensionType}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Tensión mínima:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.minimumTension}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Tensión máxima:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.maximumTension}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Corriente de entrada:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.inputCurrent}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Corriente de salida:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.outputCurrent}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Potencia:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.power}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Voltaje de potencia:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.powerVoltage}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Caballaje:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.horsepower}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Voltaje de caballaje:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.horsepowerVoltage}</p>
                </div>
            </div>

            <div className='mb-4'>
                <h5 className={`${styles.secundary__Title} m-0`}>Características mecánicas</h5>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Polos:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.poles}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Tamaño:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.size}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Alto:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.high}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Ancho:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.width}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Profundo:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.deep}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Peso:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.weight}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Montaje:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.mounting}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Conexión:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.connection}</p>
                </div>
            </div>

            <div className='mb-4'>
                <h5 className={`${styles.secundary__Title} m-0`}>Características ambientales</h5>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Eficiencia:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.efficiency}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>IP:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.ip}</p>
                </div>
            </div>

            <div className='mb-4'>
                <h5 className={`${styles.secundary__Title} m-0`}>Características estándares</h5>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Norma:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.standard}</p>
                </div>
            </div>

            <div className='mb-4'>
                <h5 className={`${styles.secundary__Title} m-0`}>Características estándares</h5>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Aplicaciones:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.applications}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Página:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.page}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Web:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.web}</p>
                </div>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Datasheet:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.datasheet}</p>
                </div>
            </div>

            <div className='mb-4'>
                <h5 className={`${styles.secundary__Title} m-0`}>Descripción</h5>
                <div className={`${styles.container__Propertie} mb-1 d-flex align-items-center justify-content-between`}>
                    <h6 className={`${styles.title__Product} m-0 px-2`}>Largo:</h6>
                    <p className={`${styles.value__Characteristics} m-0 px-3`}>{productbyQr?.long}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailProductByQrPage;