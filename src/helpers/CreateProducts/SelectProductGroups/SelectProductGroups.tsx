/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import productClass from './ProductGroups';
import styles from './styles.module.css';

interface SelectProductGroupsProps {
    onSelect: (groupProps: string) => void;
    reset: boolean;
    initialGroup?: string;
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

function SelectProductGroups({ onSelect, reset, initialGroup }: SelectProductGroupsProps) {
    const [group, setGroup] = useState<{ value: string; label: string } | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<{ value: string; label: string } | null>(initialGroup ? { value: initialGroup, label: initialGroup } : null);

    const handlePropChange = (selectedOption: any) => {
        setGroup(selectedOption);
        setSelectedGroup(selectedOption);
        const selectedValue = selectedOption.value;
        onSelect(selectedValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedGroup(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
            <h6 className={styles.label}>Grupo</h6>
            <div className={styles.container__Input}>
                <Select
                    styles={customStyles}
                    className={`${styles.input} border-0`}
                    options={productClass}
                    value={selectedGroup || group}
                    onChange={handlePropChange}
                    isSearchable={true}
                    placeholder='Grupo del producto'
                />
            </div>
        </div>
    );
}

export default SelectProductGroups;