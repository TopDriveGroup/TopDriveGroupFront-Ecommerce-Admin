/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import departments from './Departments';
import citiesByDepartment from './Cities';
import styles from './styles.module.css';
import { StylesReactSelectItems } from '../StylesComponents/StylesReactSelect';

interface DepartmenAndCityProps {
    onSelect: (department: string, city: string, codeDane: string, subregionCodeDane: string) => void;
    reset: boolean;
    initialDepartment?: string;
    initialCity?: string;
}

function DepartmenAndCity({ onSelect, reset, initialDepartment, initialCity }: DepartmenAndCityProps) {
    const [department, setDepartment] = useState<{ value: string; label: string } | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<{ value: string; label: string } | null>(initialDepartment ? { value: initialDepartment, label: initialDepartment } : null);

    useEffect(() => {
        if (initialDepartment) {
            const departmentOption = departments.find(dep => dep.value === initialDepartment) || null;
            setDepartment(departmentOption);
        }

        if (initialCity && initialDepartment) {
            const cityOptions = citiesByDepartment[initialDepartment as keyof typeof citiesByDepartment] || [];
            const cityOption = cityOptions.find(city => city.value === initialCity) || null;
            setCity(cityOption);
        }
    }, [initialDepartment, initialCity]);
    
    const handleDepartmentChange = (selectedOption: any) => {
        setDepartment(selectedOption);
        setSelectedDepartment(selectedOption);
        setCity(null);
        setSelectedCity(null);
        const selectedDepartmentValue = selectedOption.value;
        const selectedCityValue = '';
        const selectedCityCodeDane = '';
        const selectedCitySubregionCodeDane = '';
        onSelect(selectedDepartmentValue, selectedCityValue, selectedCityCodeDane, selectedCitySubregionCodeDane);
    };

    const [city, setCity] = useState<{ value: string; label: string } | null>(null);
    const [selectedCity, setSelectedCity] = useState<{ value: string; label: string, codeDane:string } | null>(initialCity ? { value: initialCity, label: initialCity, codeDane: '' } : null);

    const handleCityChange = (selectedOption: any) => {
        setCity(selectedOption);
        setSelectedCity(selectedOption);
        const selectedDepartmentValue = department!.value;
        const selectedCityValue = selectedOption.value;
        const selectedCityCodeDane = selectedOption.codeDane;
        const selectedCitySubregionCodeDane = selectedOption.subregionCodeDane;
        onSelect(selectedDepartmentValue, selectedCityValue, selectedCityCodeDane, selectedCitySubregionCodeDane);
    };

    const cityOptions: { value: string; label: string }[] = department ? citiesByDepartment[department.value as keyof typeof citiesByDepartment] || [] : [];

    useEffect(() => {
        if (reset) {
            setSelectedDepartment(null);
            setSelectedCity(null);
        }
    }, [reset]);

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-center gap-3`}>
            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Departamento</h6>
                <div className={styles.container__Input}>
                    <Select
                        className={`${styles.input} border-0`}
                        options={departments}
                        value={selectedDepartment || department}
                        onChange={handleDepartmentChange}
                        isSearchable={true}
                        styles={StylesReactSelectItems}
                    />
                </div>
            </div>

            <div className={`${styles.container__Info} d-flex flex-column align-items-start justify-content-start position-relative`}>
                <h6 className={styles.label}>Ciudad</h6>
                <div className={styles.container__Input}>
                    <Select
                        className={`${styles.input} border-0`}
                        options={cityOptions}
                        value={selectedCity || city}
                        onChange={handleCityChange}
                        isSearchable={true}
                        styles={StylesReactSelectItems}
                    />
                </div>
            </div>
        </div>
    );
}

export default DepartmenAndCity;