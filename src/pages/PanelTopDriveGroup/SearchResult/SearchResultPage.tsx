/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSearchProducts } from '../../../redux/Landing/productSlice/actions';
import { resetSearchCompleted } from '../../../redux/Landing/productSlice/productSlice';
import type { RootState, AppDispatch } from '../../../redux/store';
import { IProduct } from '../../../types/product.types';
import NavBar from '../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../components/PanelTopDriveGroup/Footer/Footer';
import Loading from '../../../components/GeneralComponents/ComponentLoading/Loading';
import ProductFilters from '../../../components/Landing/ProductFilters/ProductFilters';
import Paginated from '../../../components/GeneralComponents/Paginated/Paginated';
import { formatNumber } from '../../../helpers/FormatNumber/FormatNumber';
import { IoGridSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from './styles.module.css';

interface Filter {
    id: string;
    label: string;
    property: string;
}

function SearchResultPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { description } = useParams<{ description: string }>();
    const { products, loading, errorProduct, totalProducts } = useSelector((state: RootState) => state.products);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsByPage, setItemsByPage] = useState<number>(20);
    const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
    const [sortCriteria, setSortCriteria] = useState<string>('A-Z');
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
    
    useEffect(() => {
        const fetchProductsByDescription = async (desc: string, page: number, limit: number, sortBy?: string, filters?: Filter[]) => {
            try {
                await dispatch(getSearchProducts(desc, page, limit, sortBy, filters));
            } catch (error) {
                throw new Error('Error al hacer el cierre de sesión');
            }
        };

        const searchDescription = localStorage.getItem('searchDescription');

        if (description) {
            localStorage.setItem('searchDescription', description);
            fetchProductsByDescription(description, currentPage, itemsByPage, sortCriteria, selectedFilters);
        } else if (searchDescription) {
            fetchProductsByDescription(searchDescription, currentPage, itemsByPage, sortCriteria, selectedFilters);
        } else {
            navigate('/');
        }

        return () => {
            dispatch(resetSearchCompleted());
        };
    }, [description, currentPage, itemsByPage, sortCriteria, selectedFilters]);

    useEffect(() => {
        if (products) {
            setFilteredProducts(Array.isArray(products) ? products : [products]);
        }
    }, [products]);

    useEffect(() => {
        const sorted = [...filteredProducts];
        switch (sortCriteria) {
            case 'A-Z':
                sorted.sort((a, b) => a.description.localeCompare(b.description));
                break;
            case 'Z-A':
                sorted.sort((a, b) => b.description.localeCompare(a.description));
                break;
            case 'lowerPrice':
                sorted.sort((a, b) => (a.sellingPriceFinalUser ?? 0) - (b.sellingPriceFinalUser ?? 0));
                break;
            case 'higherPrice':
                sorted.sort((a, b) => (b.sellingPriceFinalUser ?? 0) - (a.sellingPriceFinalUser ?? 0));
                break;
            case 'bestSelling':
                sorted.sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0));
                break;
            case 'discount':
                sorted.sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0));
                break;
            case 'newest':
                sorted.sort((a, b) => new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime());
                break;
            default:
                break;
        }
        setFilteredProducts(sorted);
    }, [sortCriteria]);

    const handleFiltersChange = (selectedFilters: Filter[]) => {
        setSelectedFilters(selectedFilters); // Actualiza el estado de los filtros seleccionados
    };

    const handleItemsByPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsByPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleGridView = () => setSelectedView('grid');
    const handleListView = () => setSelectedView('list');

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriteria(event.target.value);
    };

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-between position-relative`}>
                <div className={styles.container__Filters}>
                    <ProductFilters
                        onFiltersChange={handleFiltersChange}
                    />
                </div>
                <div className={styles.container__Filtered_Products}>
                    {loading ? (
                        <div className={`${styles.container__Loading} d-flex align-items-center justify-content-center`}>
                            <Loading />
                        </div>
                    ) : errorProduct ? (
                        <p>Error: {errorProduct}</p>
                    ) : filteredProducts.length > 0 ? (
                        <div>
                            <div className={`${styles.container__Header_Result_and_See} d-flex align-items-center justify-content-between`}>
                                {filteredProducts.length === 1 ? `${filteredProducts.length} resultado` : `${filteredProducts.length} resultados`}

                                <div className={`${styles.container__Order_And_view} d-flex`}>
                                    <div className={`${styles.container__Order_By} d-flex align-items-center justify-content-center`}>
                                        <span>Ordenar por:</span>
                                        <div className={styles.select__Order}>
                                            <select className='border-0' onChange={handleSortChange} value={sortCriteria}>
                                                <option value="A-Z">Nombre de la A - Z</option>
                                                <option value="Z-A">Nombre de la Z - A</option>
                                                <option value="lowerPrice">Menor precio</option>
                                                <option value="higherPrice">Mayor precio</option>
                                                <option value="bestSelling">Más vendidos</option>
                                                <option value="newest">Más recientes</option>
                                                <option value="discount">Descuento</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={`${styles.container__View_Product} d-flex align-items-center justify-content-center`}>
                                        Vista
                                        <IoGridSharp
                                            className={`${styles.icon__Grid} ${selectedView === 'grid' ? styles.selected : ''}`}
                                            onClick={handleGridView}
                                        /> 
                                        <GiHamburgerMenu
                                            className={`${styles.icon__Horizon} ${selectedView === 'list' ? styles.selected : ''}`}
                                            onClick={handleListView}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.container__Paginated} d-flex align-items-center justify-content-end gap-2`}>
                                <Paginated
                                    totalProducts={totalProducts}
                                    limit={itemsByPage}
                                    onPageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                                <div className={`${styles.container__Items_By_page} d-flex align-items-center justify-content-center`}>
                                    <span>Ver:</span>
                                    <div className={`${styles.select__Items_By_page} mx-2`}>
                                        <select
                                            className={`${styles.select} p-1 border-0`}
                                            value={itemsByPage}
                                            onChange={handleItemsByPage}
                                        >
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                    <span>por página</span>
                                </div>
                            </div>
                            <div className={`${styles.container__Products} mt-3 d-flex flex-wrap align-items-center justify-content-center`}>
                                {selectedView === 'grid' ? (
                                    filteredProducts.map((product: IProduct, index: number) => (
                                        <ProductCard key={index} product={product} />
                                    ))
                                ) : (
                                    filteredProducts.map((product: IProduct, index: number) => (
                                        <ProductCardHorizon key={index} product={product} />
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.container__Loading} d-flex align-items-center justify-content-center`}>
                            <Loading />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchResultPage;



interface ProductCardProps {
    product: IProduct;
}

// Renderización de los resultados de búsqueda en formato Card
const ProductCard = ({ product }: ProductCardProps) => {
    const images = [
        product.mainImage,
        product.secondaryImage,
        ...(product.otherImages ?? [])
    ].filter(Boolean);

    const [imageIndex, setImageIndex] = useState(0);

    const handleMouseEnter = () => {
        if (images.length > 1) {
            setImageIndex(1);
        }
    };

    const handleMouseLeave = () => {
        setImageIndex(0);
    };

    return (
        <div className={styles.container__Product}>
            <Link to={`/details/${product._id}`} className='text-decoration-none'>
                <div className={`${styles.card__Product} px-2 overflow-hidden`}>
                    <div 
                        className={`${styles.container__Image} position-relative overflow-hidden d-flex align-items-center justify-content-center`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={images[imageIndex]} alt="Item" className={styles.image__Product} loading="lazy" />
                    </div>
                    <div className={styles.container__Info}>
                        <p className={`${styles.brand__Product} m-0 overflow-hidden`}>{product.manufacturer}</p>
                        <p className={`${styles.title__Product} m-0 overflow-hidden`}>{product.description}</p>
                        <p className={`${styles.price__Product} m-0`}><span className={styles.currency__Sign}>$ </span>{formatNumber(product.sellingPriceFinalUser)} und</p>
                        <p className={`${styles.stock__Product} m-0`}>{product.inventory} unidades en stock</p>
                    </div>
                </div>
            </Link>
            <div className={`${styles.add__To_Cart} d-flex align-items-center justify-content-center`}>
                Añadir al carrito
            </div>
        </div>
    );
}


// Renderización de los resultados de búsqueda en formato horizontal
const ProductCardHorizon = ({ product }: ProductCardProps) => {
    const images = [
        product.mainImage,
        product.secondaryImage,
        ...(product.otherImages ?? [])
    ].filter(Boolean);

    const [imageIndex, setImageIndex] = useState(0);

    const handleMouseEnter = () => {
        if (images.length > 1) {
            setImageIndex(1);
        }
    };

    const handleMouseLeave = () => {
        setImageIndex(0);
    };

    return (
        <div className={`${styles.container__Product_Horizon} mb-3 d-flex`}>
            <Link to={`/details/${product._id}`} className={`${styles.link__Horizon_Detail_Product} text-decoration-none`}>
                <div className={`${styles.card__Product_Horizon} d-flex overflow-hidden`}>
                    <div 
                        className={`${styles.container__Image_Horizon} d-flex align-items-center justify-content-center position-relative overflow-hidden`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={images[imageIndex]} alt="Item" className={styles.image__Product} loading="lazy" />
                    </div>
                    <div className={`${styles.container__Info_Horizon} p-4 d-flex flex-column`}>
                        <p className={`${styles.brand__Product} m-0`}>{product.manufacturer}</p>
                        <p className={`${styles.title__Product} m-0 overflow-hidden`}>{product.description}</p>
                        <p className={`${styles.stock__Product} m-0`}>{product.inventory} unidades en stock</p>
                    </div>
                </div>
            </Link>
            <div className={`${styles.container__Add_Cart} pt-4 d-flex flex-column align-items-center justify-content-between`}>
                <div>
                    <p className={`${styles.price__Product_Horizon} m-0`}><span className={styles.currency__Sign}>$ </span>{formatNumber(product.sellingPriceFinalUser)} und</p>
                </div>
                <div className={`${styles.add__To_Cart_Horizon} d-flex align-items-center justify-content-center`}>Añadir al carrito</div>
            </div>
        </div>
    );
}