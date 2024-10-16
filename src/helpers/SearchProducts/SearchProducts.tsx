/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/Landing/productSlice/actions';
import type { RootState, AppDispatch } from '../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from "../../types/product.types";
import { StylesReactSelectItems } from '../StylesComponents/StylesReactSelect';

interface SearchProductsProps {
    onProductSelect?: (value: number | null) => void;
    onDataProductSelect?: (data: IProduct) => void;
}

interface OptionType {
    value: string;
    label: string;
    data?: IProduct;
}

function SearchProducts({ onProductSelect, onDataProductSelect }: SearchProductsProps) {
    const dispatch: AppDispatch = useDispatch();

    // Estados de Redux
    const products = useSelector((state: RootState) => state.products.products);

    const [filterText, setFilterText] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                event.target instanceof Node &&
                !selectRef.current.contains(event.target) &&
                selectedOption === null
            ) {
                setFilterText('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectRef, selectedOption]);

    const filteredOptions: OptionType[] = Array.isArray(products)
        ? products
            .filter((item) => 
                (item?.description && item.description.toLowerCase().includes(filterText.toLowerCase()))
            )
            .map((item) => ({
                value: item.barCode ? item.barCode.toString() : '',  // Manejar undefined barCode
                label: `${item.description} - ${item.barCode ? item.barCode : 'N/A'}`,  // Mostrar 'N/A' si barCode es undefined
                data: item, // Incluimos los datos completos del artículo
            }))
        : [];

    const handleInputChange = (inputValue: string) => {
        setFilterText(inputValue);
    };

    const handleSelectChange = (option: OptionType | null) => {
        if (option) {
            if (onProductSelect) {
                onProductSelect(option?.value ? parseInt(option.value) : null); // Llama la función `onProductSelect` si está definida
            }
            if (onDataProductSelect && option?.data) {
                onDataProductSelect(option.data); // Llama la función `onDataProductSelect` con los datos completos del cliente
            }
            setSelectedOption(option);
        }
    };

    return (
        <div ref={selectRef} className="d-flex align-products-center justify-content-center">
            <Select
                value={selectedOption}
                inputValue={filterText}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                options={filteredOptions}
                placeholder="Busca por nombre"
                isSearchable
                styles={StylesReactSelectItems}
            />
        </div>
    );
}

export default SearchProducts;