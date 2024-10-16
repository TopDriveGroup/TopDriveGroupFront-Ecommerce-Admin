/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCaretUp, PiCaretDown } from 'react-icons/pi';
import classFilter from '../../../helpers/ProductFilters/ClassFilters';
import categoryFilter from '../../../helpers/ProductFilters/CategoryFilters';
import typeFilter from '../../../helpers/ProductFilters/TypeFilters';
import styles from './styles.module.css';

interface Filter {
    property: string;
    id: string;
    label: string;
}

interface ProductFiltersProps {
    onFiltersChange: (selectedFilters: Filter[]) => void;
}

function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
    const searchDescription = localStorage.getItem('searchDescription');

    // State para manejar los filtros seleccionados por propiedad
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

    // Función para cambiar el estado de un filtro seleccionado/deseleccionado
    const handleCheckboxChange = (id: string, label: string, property: string) => {
        setSelectedFilters(prevSelected => {
            const index = prevSelected.findIndex(filter => filter.id === id);
            if (index !== -1) {
                // Remove filter if already selected
                const updatedFilters = [...prevSelected];
                updatedFilters.splice(index, 1);
                return updatedFilters;
            } else {
                // Add filter if not selected
                return [...prevSelected, { id, label, property }];
            }
        });
    };

    // Estados y funciones para manejar la búsqueda y visualización de filtros
    const [classFilterSearch, setClassFilterSearch] = useState('');
    const [categoryFilterSearch, setCategoryFilterSearch] = useState('');
    const [typeFilterSearch, setTypeFilterSearch] = useState('');

    // Expansión de los filtros
    const [showFilterClass, setShowFilterClass] = useState(false);
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);
    const [showTypeFilter, setShowTypeFilter] = useState(false);

    const handleShowFilterClass = () => setShowFilterClass(true);
    const handleHideFilterClass = () => setShowFilterClass(false);
    const handleShowCategoryFilter = () => setShowCategoryFilter(true);
    const handleHideCategoryFilter = () => setShowCategoryFilter(false);
    const handleShowTypeFilter = () => setShowTypeFilter(true);
    const handleHideTypeFilter = () => setShowTypeFilter(false);

    // Funciones para manejar cambios en la búsqueda de filtros
    const handleClassFilterSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassFilterSearch(event.target.value);
    };

    const handleCategoryFilterSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryFilterSearch(event.target.value);
    };

    const handleTypeFilterSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeFilterSearch(event.target.value);
    };

    // Filtrado de opciones de clase y categoría según la búsqueda
    const filteredClassFilters = classFilter.filter(filter =>
        filter.label.toLowerCase().includes(classFilterSearch.toLowerCase())
    );

    const filteredCategoryFilters = categoryFilter.filter(filter =>
        filter.label.toLowerCase().includes(categoryFilterSearch.toLowerCase())
    );

    const filteredTypeFilters = typeFilter.filter(filter =>
        filter.label.toLowerCase().includes(typeFilterSearch.toLowerCase())
    );

    // Funciones para eliminar y aplicar filtros
    const handleDeleteFilters = () => {
        setSelectedFilters([]);
    };

    const handleApplyFilters = () => {
        onFiltersChange(selectedFilters);
    };

    return (
        <div>
            <div className={`${styles.container} p-3`}>
                <div className='mb-2 d-flex'>
                    <Link to='/' className={`${styles.home} text-decoration-none`}>Inicio</Link>/<span>{searchDescription}</span>
                </div>
                <div className={`${styles.container__Filters} d-flex flex-column align-items-start justify-content-start`}>
                    <div className={`${styles.head__Filters}`}>
                        <div className={`${styles.header__Filters} mb-2 d-flex align-items-center justify-content-between`}>
                            <p className='m-0'>Filtrado por:</p>
                            <div className={`${styles.delete__Filters}`} onClick={handleDeleteFilters}>Eliminar filtros</div>
                        </div>
                        <div className={`${styles.all__Selected_Filters} p-2 d-flex flex-wrap align-items-start justify-content-start`}>
                            {selectedFilters.map(filter => (
                                <div key={filter.id} className={`${styles.selected__Filter} m-1 px-2 d-flex align-items-center justify-content-center`}>
                                    {filter.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.filters} mt-2 overflow-y-auto`}>
                        <div className={`${styles.filter} mb-3 pb-1`}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>Clase</div>
                                {!showFilterClass ? (
                                    <PiCaretDown className={`${styles.icon__Show}`} onClick={handleShowFilterClass} />
                                ) : (
                                    <PiCaretUp className={`${styles.icon__Show}`} onClick={handleHideFilterClass} />
                                )}
                            </div>
                            {showFilterClass && (
                                <div className={`${styles.container__Render_Filters} p-2 overflow-y-auto`}>
                                    <input
                                        type="text"
                                        placeholder="Buscar Clase"
                                        value={classFilterSearch}
                                        onChange={handleClassFilterSearchChange}
                                        className={`${styles.search__Input} p-1`}
                                    />
                                    {filteredClassFilters.map(filter => (
                                        <div
                                            key={filter.id}
                                            className={styles.select__Filter}
                                        >
                                            <input
                                                type="checkbox"
                                                id={filter.id}
                                                className={`${styles.input__Checkbox} position-relative`}
                                                checked={selectedFilters.some(selected => selected.id === filter.id)}
                                                onChange={() => handleCheckboxChange(filter.id, filter.label, 'class')}
                                            />
                                            <label htmlFor={filter.id}>{filter.label}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={`${styles.filter} mb-3 pb-1`}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>Categoría</div>
                                {!showCategoryFilter ? (
                                    <PiCaretDown className={`${styles.icon__Show}`} onClick={handleShowCategoryFilter} />
                                ) : (
                                    <PiCaretUp className={`${styles.icon__Show}`} onClick={handleHideCategoryFilter} />
                                )}
                            </div>
                            {showCategoryFilter && (
                                <div className={`${styles.container__Render_Filters} p-2 overflow-y-auto`}>
                                    <input
                                        type="text"
                                        placeholder="Buscar Categoría"
                                        value={categoryFilterSearch}
                                        onChange={handleCategoryFilterSearchChange}
                                        className={`${styles.search__Input} p-1`}
                                    />
                                    {filteredCategoryFilters.map(filter => (
                                        <div
                                            key={filter.id}
                                            className={styles.select__Filter}
                                        >
                                            <input
                                                type="checkbox"
                                                id={filter.id}
                                                className={`${styles.input__Checkbox} position-relative`}
                                                checked={selectedFilters.some(selected => selected.id === filter.id)}
                                                onChange={() => handleCheckboxChange(filter.id, filter.label, 'category')}
                                            />
                                            <label htmlFor={filter.id}>{filter.label}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={`${styles.filter} mb-3 pb-1 `}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>Tipo</div>
                                {!showTypeFilter ? (
                                    <PiCaretDown className={`${styles.icon__Show} `} onClick={handleShowTypeFilter} />
                                ) : (
                                    <PiCaretUp className={`${styles.icon__Show} `} onClick={handleHideTypeFilter} />
                                )}
                            </div>
                            {showTypeFilter && (
                                <div className={`${styles.container__Render_Filters} p-2 overflow-y-auto`}>
                                    <input
                                        type="text"
                                        placeholder="Buscar Tipo"
                                        value={typeFilterSearch}
                                        onChange={handleTypeFilterSearchChange}
                                        className={`${styles.search__Input} p-1`}
                                    />
                                    {filteredTypeFilters.map(filter => (
                                        <div
                                            key={filter.id}
                                            className={styles.select__Filter}
                                        >
                                            <input
                                                type="checkbox"
                                                id={filter.id}
                                                className={`${styles.input__Checkbox} position-relative`}
                                                checked={selectedFilters.some(selected => selected.id === filter.id)}
                                                onChange={() => handleCheckboxChange(filter.id, filter.label, 'type')}
                                            />
                                            <label htmlFor={filter.id}>{filter.label}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`${styles.button__Apply_Filters} d-flex align-items-center justify-content-center`} onClick={handleApplyFilters}>
                        Aplicar filtros
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFilters;