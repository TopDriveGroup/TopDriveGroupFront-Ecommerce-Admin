/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import productUnitMeasure from './ProductUnitMeasure';
import styles from './styles.module.css';

interface SelectProductUnitMeasureProps {
    onSelect: (unitMeasureProps: string) => void;
    reset: boolean;
    initialUnitMeasure?: string;
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

function SelectProductUnitMeasure({ onSelect, reset, initialUnitMeasure }: SelectProductUnitMeasureProps) {
    const [unitMeasure, setUnitMeasure] = useState<{ value: string; label: string } | null>(null);
    const [selectedUnitMeasure, setSelectedUnitMeasure] = useState<{ value: string; label: string } | null>(initialUnitMeasure ? { value: initialUnitMeasure, label: initialUnitMeasure } : null);

    const handlePropChange = (selectedOption: any) => {
        setUnitMeasure(selectedOption);
        setSelectedUnitMeasure(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedUnitMeasure(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Unidad de medida</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={productUnitMeasure}
                    value={selectedUnitMeasure || unitMeasure}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Unidad de medida del producto'
                />
            </div>
        </div>
    );
}

export default SelectProductUnitMeasure;