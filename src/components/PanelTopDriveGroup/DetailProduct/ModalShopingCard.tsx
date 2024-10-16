/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoTopDrive from '../../../assets/TopDriveGroup/LogoTopDrive.svg';
import { ICartProduct } from '../../../types/cartProduct';
import { formatNumber } from '../../../helpers/FormatNumber/FormatNumber';
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";
import styles from './styles.module.css';

interface ModalShopingCardProps {
    closeModal: () => void;
    productsInLocalStorage: ICartProduct[] | undefined;
}

function ModalShopingCard({ closeModal, productsInLocalStorage: initialProductsInLocalStorage }: ModalShopingCardProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [productsInLocalStorage, setProductsInLocalStorage] = useState<ICartProduct[]>(initialProductsInLocalStorage || []);

    useEffect(() => {
        // Actualizar el estado local cuando cambie la prop
        setProductsInLocalStorage(initialProductsInLocalStorage || []);
    }, [initialProductsInLocalStorage]);

    const handleIncrement = (productId: string | undefined) => {
        if (!productId || !productsInLocalStorage) return;

        const updatedProducts = productsInLocalStorage.map(product => {
            if (product.productId === productId) {
                const newQuantity = product.quantity + 1;
                return {
                    ...product,
                    quantity: newQuantity,
                    subtotal: newQuantity * product.sellingPrice
                };
            }
            return product;
        });

        updateLocalStorage(updatedProducts);
    };

    const handleDecrement = (productId: string | undefined) => {
        if (!productId || !productsInLocalStorage) return;

        const updatedProducts = productsInLocalStorage.map(product => {
            if (product.productId === productId) {
                const newQuantity = Math.max(product.quantity - 1, 1); // Asegura que la cantidad mínima sea 1
                return {
                    ...product,
                    quantity: newQuantity,
                    subtotal: newQuantity * product.sellingPrice
                };
            }
            return product;
        });

        updateLocalStorage(updatedProducts);
    };

    const updateLocalStorage = (updatedProducts: ICartProduct[]) => {
        if (updatedProducts.length === 0) {
            // Eliminar el carrito del localStorage si no hay productos
            localStorage.removeItem('order');
        } else {
            // Actualizar el carrito en el localStorage si hay productos
            localStorage.setItem('order', JSON.stringify({ products: updatedProducts, total: calculateTotalPurchase(updatedProducts), client: 'idUser' }));
        }
        setProductsInLocalStorage(updatedProducts); // Actualizar el estado local
    };

    const calculateTotalPurchase = (products: ICartProduct[]) => {
        return products.reduce((total, product) => {
            return total + (product.sellingPrice * product.quantity);
        }, 0);
    };

    const calculateTotalPrice = (product: ICartProduct) => {
        const totalPrice = product.sellingPrice * product.quantity;
        return formatNumber(totalPrice);
    };

    const formattedTotalPurchase = formatNumber(calculateTotalPurchase(productsInLocalStorage));

    const handleDeleteProduct = (productId: string | undefined) => {
        if (!productId || !productsInLocalStorage) return;

        const updatedProducts = productsInLocalStorage.filter(product => product.productId !== productId);
        updateLocalStorage(updatedProducts);
    };

    return (
        <div className={`${styles.container} d-flex flex-column align-items-start justify-content-start`} ref={modalRef}>
            <div className={`${styles.container__Component} `} ref={modalRef}>
                <div className={`${styles.container__Logo_Close} p-2 d-flex align-items-center justify-content-between`}>
                    <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                        <img src={LogoTopDrive} alt="Logo Top Drive Group" className={`${styles.logo} m-auto`} loading="lazy" />
                    </div>
                    <div onClick={closeModal}><IoClose className={styles.icon__Close_Modal} /></div>
                </div>

                <h6 className={`${styles.title} text-center`}>Relación de tus productos</h6>

                <div className={`${styles.container__Data} d-flex flex-column overflow-y-auto`}>
                    {productsInLocalStorage?.map((product, index) => (
                        <div className={`${styles.container__Product} d-flex`} key={index}>
                            <div className={`${styles.container__Image_Product} p-1 d-flex align-items-center justify-content-center overflow-hidden`}>
                                <img src={product?.mainImage} className={`${styles.image__Product} `} alt={`${product?.description}`} />
                            </div>
                            <div className={`${styles.container__Text_Product} `}>
                                <p className={`${styles.title__Product} overflow-hidden`}>{product?.description}</p>
                                <p className={`${styles.title__Sap} m-0`}>SAP: {product?.sap}</p>
                                <div className={`${styles.container__Count} d-flex`}>
                                    <div className={`${styles.container__Icon_Minus_Plus} d-flex align-items-center justify-content-center`} onClick={() => handleDecrement(product.productId)}>
                                        <HiMiniMinus className={styles.icon} />
                                    </div>
                                    <div className={`${styles.count} d-flex align-items-center justify-content-center`}>{product.quantity}</div>
                                    <div className={`${styles.container__Icon_Minus_Plus} d-flex align-items-center justify-content-center`} onClick={() => handleIncrement(product.productId)}>
                                        <HiMiniPlus className={styles.icon} />
                                    </div>
                                </div>
                                <p className={`${styles.price__Product} m-0`}>$ {formatNumber(product.sellingPrice)} por und</p>
                                <p className={`${styles.price__Product} m-0`}>Subtotal: $ {calculateTotalPrice(product)}</p>
                            </div>
                            <div className={`${styles.container__Icon_Delete} d-flex align-items-center justify-content-center`} onClick={() => handleDeleteProduct(product.productId)}>
                                <RiDeleteBin6Line className={`${styles.icon_Delete} `}/>
                            </div>
                        </div>
                    ))}

                    <div className={`${styles.container__Total} p-1 text-end`}>
                        Total de la compra: $ {formattedTotalPurchase}
                    </div>

                    <div className={`${styles.container__Buttons_Navigate} mb-4 d-flex align-items-center justify-content-between`}>
                        <div className={styles.button__Continue_Shopping} onClick={closeModal}>Seguir comprando</div>
                        <Link to={'/ecommerce/shopping-cart'} className={`${styles.button_Go_To_Cart} text-decoration-none`}>Ir al carrito</Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ModalShopingCard;