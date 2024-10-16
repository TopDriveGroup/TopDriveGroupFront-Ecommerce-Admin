/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import productsCategories from './ProductsCategories';
import styles from './styles.module.css';

interface ProductsCategoriesProps {
    onSelect: (productsCategoriesProps: string) => void;
    reset: boolean;
    initialProductsCategories?: string;
}

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        margin: '0 0 30px 0',
        borderRadius: '3px',
        width: '100%',
        outline: state.isFocused ? '1px solid #e4002b' : 'none',
        boxShadow: state.isFocused ? '0 0 0 1px #e4002b' : 'none',
        borderColor: state.isFocused ? '#e4002b' : provided.borderColor,
        '&:hover': {
            borderColor: state.isFocused ? '#e4002b' : provided.borderColor,
        },
    }),
};

function SelectProductsCategories({ onSelect, reset, initialProductsCategories }: ProductsCategoriesProps) {
    const [productCategory, setProductCategory] = useState<{ value: string; label: string } | null>(null);
    const [selectedUnitMeasure, setSelectedProductCategory] = useState<{ value: string; label: string } | null>(initialProductsCategories ? { value: initialProductsCategories, label: initialProductsCategories } : null);

    const handlePropChange = (selectedOption: any) => {
        setProductCategory(selectedOption);
        setSelectedProductCategory(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedProductCategory(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Categoría</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={productsCategories}
                    value={selectedUnitMeasure || productCategory}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Categoría del producto'
                />
            </div>
        </div>
    );
}

export default SelectProductsCategories;