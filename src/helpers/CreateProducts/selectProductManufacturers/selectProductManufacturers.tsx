/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import productsTypes from './ProductManufacturers';
import styles from './styles.module.css';

interface ProductManufacturerProps {
    onSelect: (productManufacturersProps: string) => void;
    reset: boolean;
    initialProductManufacturers?: string;
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

function SelectProductManufacturers({ onSelect, reset, initialProductManufacturers }: ProductManufacturerProps) {
    const [productManufacturer, setProductManufacturer] = useState<{ value: string; label: string } | null>(null);
    const [selectedProductManufacturer, setSelectedProductManufacturer] = useState<{ value: string; label: string } | null>(initialProductManufacturers ? { value: initialProductManufacturers, label: initialProductManufacturers } : null);

    const handlePropChange = (selectedOption: any) => {
        setProductManufacturer(selectedOption);
        setSelectedProductManufacturer(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedProductManufacturer(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Fabricante</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={productsTypes}
                    value={selectedProductManufacturer || productManufacturer}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Fabricante del producto'
                />
            </div>
        </div>
    );
}

export default SelectProductManufacturers;