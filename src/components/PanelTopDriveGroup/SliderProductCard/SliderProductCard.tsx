/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState } from 'react';
//ELEMENTOS DEL COMPONENTE
import { formatNumber } from '../../../helpers/FormatNumber/FormatNumber';
import styles from './styles.module.css';

export const SliderProductCard = ({ product }: { product: any }) => {
    const [imageIndex, setImageIndex] = useState(0);

    const handleMouseEnter = () => {
        setImageIndex(1);
    };

    const handleMouseLeave = () => {
        setImageIndex(0);
    };

    return (
        <div className={`${styles.card__Slider} overflow-hidden`}>
            <div
                className={`${styles.container__Image} position-relative overflow-hidden d-flex align-items-center justify-content-center`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={imageIndex === 0 ? product.mainImage : product.secondaryImage} alt="Item" className={styles.image__Product} loading="lazy" />
            </div>
            <div className={`${styles.container__Info} `}>
                <p className={`${styles.brand__Product} m-0`}>{product.manufacturer}</p>
                <p className={`${styles.title__Product} m-0 overflow-hidden`}>{product.description}</p>
                <p className={`${styles.price__Product} m-0`}><span className={`${styles.currency__Sign}`}>$</span>{formatNumber(product.sellingPriceDistributor)}</p>
                <p className={`${styles.stock__Product} m-0`}>{product.inventory} unidades en stock</p>
            </div>
        </div>
    );
}