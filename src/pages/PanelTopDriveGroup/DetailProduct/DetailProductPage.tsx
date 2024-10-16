/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import jsCookie from "js-cookie";
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { getProductById } from '../../../redux/Landing/productSlice/actions';
import { postTrackProductView } from '../../../redux/Landing/productSlice/actions';
// ELEMENTOS DEL COMPONENTE
import NavBar from '../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../components/PanelTopDriveGroup/Footer/Footer';
import DownloadDataSheet from '../../../components/Landing/DetailProduct/DownloadDataSheet';
import ModalShopingCard from '../../../components/Landing/DetailProduct/ModalShopingCard';
// import Accesories from '../../../components/Landing/Accesories/Accesories';
import Loading from '../../../components/GeneralComponents/ComponentLoading/Loading';
import { IProduct } from '../../../types/product.types';
import { IInspiredByLastSaw } from '../../../types/InspiredByLastSaw.types';
import { ICartProduct } from '../../../types/cartProduct';
import { IFavorites } from '../../../types/favorites.types';
import { formatNumber } from '../../../helpers/FormatNumber/FormatNumber';
import SliderZoom from '../../../helpers/SliderZoom/SliderZoom';
import TechnicaData from '../../../components/Landing/DetailProduct/TechnicaData/TechnicaData';
import { AiFillFilePdf } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { GrStar } from 'react-icons/gr';
import { VscStarHalf } from "react-icons/vsc";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";
import { IoMdHeart , IoMdHeartEmpty } from "react-icons/io";
import styles from './styles.module.css';

function DetailProductPage() {
    const token = jsCookie.get('token') || '';
    const { idProduct } = useParams<{ idProduct: string }>();
    const dispatch: AppDispatch = useDispatch();
    const [downloadPdf, setDownloadPdf] = React.useState(false);

    // ESTADO DE REDUX
    const productsState = useSelector((state: RootState) => state.products.products) as IProduct;
    const user = useSelector((state: RootState) => state.user.user);
    const errorProduct = useSelector((state: RootState) => state.products.errorProduct);
    
    const idUser = user?.id;
    const [count, setCount] = useState(1);
    const [showModal, setShowModal] = useState(false);
    
    const [productsInLocalStorage, setProductsInLocalStorage] = useState<ICartProduct[]>();
    const [selectedProducts, setSelectedProducts] = useState<{ products: ICartProduct[], total: number, client: string | undefined }>({
        products: [],
        total: 0,
        client: idUser,
    });

    //GUARDA LA TRAZABILIDAD DE CONSULTA DEL CLIENTE
    const isTracked = useRef(false);
    useEffect(() => {
        if (idProduct && !isTracked.current) {
            dispatch(getProductById(idProduct));
            const sessionId = sessionStorage.getItem('sessionId');
            if (sessionId) {
                const formData: IInspiredByLastSaw = {
                    sessionId,
                    productId: idProduct,
                    client: token || '',
                };
                dispatch(postTrackProductView(formData));
                isTracked.current = true;
            }
        }
    }, [idProduct]);
    
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount(prevCount => Math.max(prevCount - 1, 1));
    };

    useEffect(() => {
        if (productsState && !Array.isArray(productsState)) {
            const product = productsState as IProduct;
            const sellingPrice = product.promotionalPrice ?? product.sellingPriceFinalUser ?? 0;
            const mainProduct: ICartProduct = {
                productId: product._id,
                sap: product.sap,
                class: product.class,
                category: product.category,
                type: product.type,
                group: product.group,
                manufacturer: product.manufacturer,
                family: product.family,
                reference: product.reference,
                mainImage: product.mainImage,
                description: product.description,
                detailUrl: `/details/${idProduct}`,
                quantity: count,
                iva: product.iva,
                sellingPrice: sellingPrice,
                subtotal: count * sellingPrice,
            };
            setSelectedProducts(prevState => ({
                ...prevState,
                products: [mainProduct],
                total: mainProduct.subtotal,
            }));
        }
    }, [productsState, count]);

    const handleAddToCart = () => {
        const storedCart = localStorage.getItem('order');                                                       // Obtener carrito desde el localStorage
        const cart = storedCart ? JSON.parse(storedCart) : { products: [], total: 0, client: idUser };
        const product = selectedProducts.products[0];                                                           // Agregar el producto actual al carrito
        const existingProductIndex = cart.products.findIndex((p: { productId: string | undefined; }) => p.productId === product.productId);
        
        if (existingProductIndex !== -1) {                                                                      // Si el producto ya existe, incrementar la cantidad y actualizar subtotal
            cart.products[existingProductIndex].quantity += product.quantity;
            cart.products[existingProductIndex].subtotal += product.subtotal;
        } else {
            cart.products.push(product);                                                                        // Si el producto no existe en el carrito, agregarlo
        }
        cart.total = cart.products.reduce((acc: any, item: { subtotal: any; }) => acc + item.subtotal, 0);      // Calcular el total del carrito
        localStorage.setItem('order', JSON.stringify(cart));                                                    // Guardar el carrito actualizado en el localStorage
        setProductsInLocalStorage([...cart.products]);                                                          // Actualizar el estado local con los productos
        toggleModal();                                                                                          // Abrir el modal del carrito después de agregar los productos
    };

    const [favoriteProducts, setFavoriteProducts] = useState<IFavorites[]>([]);                                 // Estado para guardar los productos favoritos
    const isProductFavorite = (productId: string): boolean => {                                                 // Función para saber si un producto está o no favorito
        return favoriteProducts.some(favorite => favorite.productId === productId);
    };

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favoriteProducts');
        if (storedFavorites) {
            setFavoriteProducts(JSON.parse(storedFavorites));
        }
    }, []);

    const handleAddFavorite = () => {
        if (!product) return;
        const newFavorite: IFavorites = {
            productId: product._id,
            sap: product.sap,
            family: product.family,
            series: product.series,
            reference: product.reference,
            mainImage: product.mainImage,
            description: product.description,
            sellingPrice: product.sellingPriceFinalUser ?? 0,
            iva: product.iva,
            inventory: product.inventory ?? 0,
            dateFavorite: new Date(),
            stateFavorite: 'Marked',
            client: idUser,
            class: product.class,
            category: product.category,
            type: product.type,
            group: product.group,
            manufacturer: product.manufacturer,
        };
        setFavoriteProducts(prevFavorites => [...prevFavorites, newFavorite]);                              // Agregar el nuevo favorito al estado
        localStorage.setItem('favoriteProducts', JSON.stringify([...favoriteProducts, newFavorite]));       // Guardar en localStorage
    };

    const toggleModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    
    const product = productsState as IProduct;

    useEffect(() => {
        if (downloadPdf) {
            const generatePdfDocument = async () => {
                const MyDocument = () => (
                    <DownloadDataSheet product={productsState as IProduct} />
                );
                const blob = await pdf(<MyDocument />).toBlob();
                saveAs(blob, 'ficha_tecnica.pdf');
                setDownloadPdf(false);
            };
            generatePdfDocument();
        }
    }, [downloadPdf, product]);
    
    if (errorProduct) return <div>Error: {errorProduct}</div>;
    
    if (!productsState || (Array.isArray(productsState) && productsState.length === 0)) return <Loading />;

    // Construir el array de imágenes asegurando que otras imágenes existan
    const images = [
        productsState.mainImage,
        productsState.secondaryImage,
        ...(productsState.otherImages ?? [])
    ];

    const handleDownload = () => {
        setDownloadPdf(true);
    };

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} pt-4`}>
                <div className={`${styles.container__Info_Data} d-flex gap-4`}>
                    <SliderZoom images={images} />
                    <div className={styles.info_Data}>
                        <h6 className={`${styles.brand__Product} m-0`}>{product.class} | {product.category} | {product.type}</h6>
                        <h3 className={`${styles.title__Product} m-0 overflow-hidden`}>{product.description}</h3>
                        <div className='d-flex'>
                            <GrStar className={`${styles.star__Score}`} /><GrStar className={`${styles.star__Score}`} /><GrStar className={`${styles.star__Score}`} /><GrStar className={`${styles.star__Score}`} /><VscStarHalf className={`${styles.star__Score}`} /> 4.7 (50)
                        </div>
                        <p className={`${styles.price__Product} m-0`}>$ {formatNumber(product.sellingPriceFinalUser)} und</p>
                        <p className={`${styles.stock__Product} m-0`}>{product.inventory} unidades en stockK</p>

                        <div className={`${styles.container__Updated_Cart} d-flex align-items-center justify-content-between`}>
                            <div className={`${styles.container__Count_Favorites} d-flex align-items-center justify-content-between`}>
                                <div className={`${styles.container__Count} d-flex`}>
                                    <div className={`${styles.container__Icon_Minus_Plus} d-flex align-items-center justify-content-center`} onClick={handleDecrement}>
                                        <HiMiniMinus className={styles.icon} />
                                    </div>
                                    <div className={`${styles.count} d-flex align-items-center justify-content-center`}>{count}</div>
                                    <div className={`${styles.container__Icon_Minus_Plus} d-flex align-items-center justify-content-center`} onClick={handleIncrement}>
                                        <HiMiniPlus className={styles.icon} />
                                    </div>
                                </div>

                                <div className={`${styles.container__Favorite} d-flex align-items-center justify-content-center`} onClick={handleAddFavorite}>
                                    {isProductFavorite(productsState?._id || '') ? (
                                        <IoMdHeart className={styles.icon__Favorite} />
                                    ) : (
                                        <IoMdHeartEmpty className={styles.icon__Favorite} />
                                    )}
                                </div>
                            </div>
                            
                            <button className={`${styles.button__Cart} d-flex align-items-center justify-content-center text-decoration-none border-0`} onClick={handleAddToCart} >
                                Agregar al carrito
                            </button>
                        </div>

                        {showModal && (
                            <div className={`${styles.container__Modal} d-flex align-items-start justify-content-end position-fixed`}>
                                <ModalShopingCard
                                    closeModal={closeModal}
                                    productsInLocalStorage={productsInLocalStorage}
                                />
                            </div>
                        )}

                        <div className={`${styles.container__Meta_Data} pt-2 pb-2 px-0`}>
                            <div className="d-flex align-items-start justify-content-between">
                                <div className={`${styles.data} `}>
                                    <div className={`${styles.meta__Data} pt-1 pb-2 px-0 d-flex`}>
                                        <div className={styles.title__Meta__Data}>Codigo SAP</div>
                                        <div className={styles.code__Meta_Data}>{product.sap}</div>
                                    </div>
                                    <div className={`${styles.meta__Data} pt-1 pb-2 px-0 d-flex`}>
                                        <div className={styles.title__Meta__Data}>Fabricante</div>
                                        <div className={styles.code__Meta_Data}>{product.manufacturer}</div>
                                    </div>
                                    <div className={`${styles.meta__Data} pt-1 pb-2 px-0 d-flex`}>
                                        <div className={styles.title__Meta__Data}>Referencia del producto</div>
                                        <div className={styles.code__Meta_Data}>{product.reference}</div>
                                    </div>
                                    <div className={`${styles.container__Download_Technical_Data} pt-1 pb-1`} >
                                        <div className={`${styles.title__Meta__Data} mb-3`}>Documentos de la ficha técnica</div>
                                        <div className={`${styles.download_Technical_Data} p-1 d-flex align-items-center justify-content-between`} onClick={handleDownload}>
                                            <div className='d-flex' >
                                                <AiFillFilePdf className={`${styles.pdf} mt-1`} />
                                                <p className='m-0'>Ficha técnica del producto</p>
                                            </div>
                                            <BsDownload className={styles.icon__Download} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.meta__Data_Qr} d-flex flex-column align-items-center justify-content-center overflow-hidden`}>
                                    <div className={`${styles.title__Qr_Meta__Data} `}>QR del producto</div>
                                    <div className={`${styles.qr__Meta_Data} d-flex align-items-center justify-content-center`}>
                                        <img src={product.qrCodeLink} alt="QR Code" className={styles.image__Qr}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COMPONENTE DE <Accesories /> */}

                <TechnicaData
                    product={product}
                />
            </div>
            <Footer />
        </div>
    );
}

export default DetailProductPage;