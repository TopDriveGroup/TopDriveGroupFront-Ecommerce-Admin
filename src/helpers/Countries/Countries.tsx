/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import countiesSelect from './CountiesSelect';
import { StylesReactSelectItems } from '../StylesComponents/StylesReactSelect';
import styles from './styles.module.css';

interface CountriesProps {
    onSelect: (country: string, callSign: string) => void;
    reset: boolean;
    initialCountry?: string;
}

function Countries({ onSelect, reset, initialCountry }: CountriesProps) {
    const [country, setCountry] = useState<{ value: string; label: string } | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<{ value: string; label: string } | null>(null);

    useEffect(() => {
        if (initialCountry) {
            const countryOption = countiesSelect.find(option => option.label === initialCountry);
            setSelectedCountry(countryOption || null);
            setCountry(countryOption || null);
    
            // Propaga el callsign cuando se selecciona el país inicial
            if (countryOption) onSelect(countryOption.label, countryOption.callsign);
        }
    }, [initialCountry]);

    const handleCountryChange = (selectedOption: any) => {
        setCountry(selectedOption);
        setSelectedCountry(selectedOption);
        const selectedCountryValue = selectedOption.label;
        const selectedCallSignValue = selectedOption.callsign;
        onSelect(selectedCountryValue, selectedCallSignValue);
    };

    useEffect(() => {
        if (reset) {
            setSelectedCountry(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center gap-3`}>
            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Selecciona tu País</h6>
                <div className={styles.container__Input}>
                    <Select
                        className={`${styles.input} border-0`}
                        options={countiesSelect}
                        value={selectedCountry || country}
                        onChange={handleCountryChange}
                        isSearchable={true}
                        styles={StylesReactSelectItems}
                    />
                </div>
            </div>
        </div>
    );
}

export default Countries;