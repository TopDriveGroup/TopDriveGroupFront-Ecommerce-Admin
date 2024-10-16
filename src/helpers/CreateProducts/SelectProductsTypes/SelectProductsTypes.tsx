/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import productsTypes from './ProductsTypes';
import styles from './styles.module.css';

interface ProductsTypesProps {
    onSelect: (productsTypesProps: string) => void;
    reset: boolean;
    initialProductsTypes?: string;
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

function SelectProductsTypes({ onSelect, reset, initialProductsTypes }: ProductsTypesProps) {
    const [productType, setProductType] = useState<{ value: string; label: string } | null>(null);
    const [selectedProductType, setSelectedProductType] = useState<{ value: string; label: string } | null>(initialProductsTypes ? { value: initialProductsTypes, label: initialProductsTypes } : null);

    const handlePropChange = (selectedOption: any) => {
        setProductType(selectedOption);
        setSelectedProductType(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedProductType(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Tipo</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={productsTypes}
                    value={selectedProductType || productType}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Tipo del producto'
                />
            </div>
        </div>
    );
}

export default SelectProductsTypes;