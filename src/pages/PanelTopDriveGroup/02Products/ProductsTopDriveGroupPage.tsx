/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/PanelTopDriveGroup/02Product/actions';
import type { RootState, AppDispatch } from '../../../redux/store';
// ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../types/product.types';
import NavBar from '../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../components/PanelTopDriveGroup/Footer/Footer';
import SideBar from '../../../components/PanelTopDriveGroup/SideBar/SideBar';
import ConfirmDeleteProduct from '../../../components/PanelTopDriveGroup/ConfirmDeleteProduct/ConfirmDeleteProduct';
import Paginated from '../../../components/GeneralComponents/Paginated/Paginated';
import { formatNumber } from '../../../helpers/FormatNumber/FormatNumber';
import { IoGridSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from './styles.module.css';

export interface ProductResponse {
    result: IProduct[];
}

function ProductsTopDriveGroupPage() {
    const token = jsCookie.get("token");
    const dispatch: AppDispatch = useDispatch();
    const { products, totalProducts } = useSelector((state: RootState) => state.products);

    // Página actual
    const [currentPage, setCurrentPage] = useState(1);

    // Selecciona cuántos ítems se quiere ver por página
    const [itemsByPage, setItemsByPage] = useState<number>(20);
    const handleItemsByPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsByPage(Number(event.target.value));
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (token) {
            try {
                dispatch(getProducts(token, currentPage, itemsByPage));
            } catch (error) {
                console.error('Error al traer los productos', error);
            }
        }
    }, [dispatch, token, currentPage, itemsByPage]);

    const [idProduct, setIdProduct] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleDelete = () => {
        setShowDeleteConfirmation(true);
    };

    const onCloseModal = () => {
        setShowDeleteConfirmation(false);
    };

    const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
    const handleGridView = () => {
        setSelectedView('grid');
    };

    const handleListView = () => {
        setSelectedView('list');
    };

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4 d-flex flex-column align-items-start justify-content-start`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Productos</h2>

                    <div className={`${styles.container__Link__Head_Navigate} mb-4`}>
                        <div className={`${styles.link__Head_Navigate} `}>
                            <FaPlus className={`${styles.icon__Plus} `}/>
                            <Link to='/panel-top-drive-group/products/create-product' className={`${styles.link} text-decoration-none`}>Crear productos</Link>
                        </div>
                        <div className={`${styles.link__Head_Navigate} `}>
                            <FaPlus className={`${styles.icon__Plus} `}/>
                            <Link to='/panel-top-drive-group/products/create-many-products' className={`${styles.link} text-decoration-none`}>Crear productos masivamente</Link>
                        </div>
                    </div>

                    {Array.isArray(products) && products.length > 0 && (
                        <div className={`${styles.container__Header_Result_and_See} mb-3 d-flex align-items-center justify-content-between`}>
                            {products.length === 1 ? `${products.length} resultado` : `${products.length} resultados`}
                            <div className={`${styles.container__Order_And_view} d-flex`}>
                                <div className={`${styles.container__Order_By} d-flex`}>
                                    <span>Ordenar por:</span>
                                    <div className={`${styles.select__Order}`}>
                                        <select name="" id="" className='border-0'>
                                            <option value="">Nombre de la A - Z</option>
                                            <option value="">Nombre de la Z - A</option>
                                            <option value="">Marca</option>
                                            <option value="">Menor precio</option>
                                            <option value="">Mayor precio</option>
                                            <option value="">Más vendidos</option>
                                            <option value="">Más recientes</option>
                                            <option value="">Descuento</option>
                                            <option value="">Relevancia</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`${styles.container__View_Product}`}>
                                    vista 
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
                    )}

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
                                    className={`${styles.select} p-2 border-0`}
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
                
                    {selectedView === 'grid'? 
                        <div className={`${styles.container__Product_Card} mt-3 d-flex flex-wrap align-items-center justify-content-between gap-4`}>
                            {Array.isArray(products) && products.map((product: IProduct) => (
                                <div key={product._id} className={`${styles.product__Card} d-flex flex-column align-items-center justify-content-between position-relative overflow-hidden`}>
                                    <div className={`${styles.container__Buttons} d-flex align-items-center justify-content-between position-absolute`}>
                                        <Link to={`/panel-top-drive-group/products/edit-product/${product._id}`} state={{ productToUpdate: product }} >
                                            <LuPencilLine className={styles.button__Edit} />
                                        </Link>
                                        <div
                                            onClick={() => {
                                                if (product._id) {
                                                    setIdProduct(product._id);
                                                    handleDelete();
                                                }
                                            }}
                                            title="Eliminar"
                                        >
                                            <RiDeleteBin6Line className={styles.button__Delete} />
                                        </div>
                                    </div>

                                    <div className={`${styles.container__Data} d-flex flex-column align-items-start justify-content-between`}>
                                        <div className="m-0">
                                            <h6 className="m-0">Descripción</h6>
                                            <div>
                                                <p className={`${styles.title__Product} m-0 overflow-hidden`}>{product.itemName}</p>
                                            </div>
                                        </div>
                                        <div className="m-0">
                                            <h6 className="m-0">Código Sap</h6>
                                            <div>
                                                <p className="m-0">{product.itemCode}</p>
                                            </div>
                                        </div>
                                        <div className="m-0">
                                            <h6 className="m-0">Precio Distribidor</h6>
                                            <div>
                                                <p className="m-0">{product.sellingPrice ? <span>$ {formatNumber(product.sellingPrice)}</span> : 'No definido'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${styles.container__Section_Images}`}>
                                        <h6>Imágenes</h6>
                                        <div className={`${styles.container__Images} d-flex flex-wrap align-items-start justify-content-between`}>
                                            <div className={`${styles.container__Main_Image} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <img src={product.mainImage} alt={`${product.itemName}`} className={`${styles.images} m-auto`} loading="lazy" />
                                            </div>
                                            <div className={`${styles.container__Main_Image} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <img src={product.secondaryImage} alt={product.itemName} className={`${styles.images} m-auto`} loading="lazy" />
                                            </div>
                                            {Array.isArray(product.otherImages) && product.otherImages.map((image, index) => (
                                                <div key={`${product._id}-${index}`} className={`${styles.container__Secundaries_Image} d-flex align-items-center justify-content-center`} >
                                                    <img src={image} alt={`${index + 1}`} className={`${styles.images} m-auto`} loading="lazy" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : (
                            <div className={`${styles.container__Product} position-relative`}>
                            {Array.isArray(products) && products.map((product: IProduct) => (
                                <div key={product._id} className={`${styles.product__Horizon} mt-3 d-flex align-items-center justify-content-between position-relative`}>
                                    <div className={`${styles.container__Buttons} d-flex align-items-center justify-content-between position-absolute`}>
                                        <Link to={`/panel-top-drive-group/products/edit-product/${product._id}`} state={{ productToUpdate: product }}>
                                            <LuPencilLine className={styles.button__Edit}/>
                                        </Link>
                                        <div
                                            onClick={() => {
                                                if (product._id) {
                                                    setIdProduct(product._id);
                                                    handleDelete();
                                                }
                                            }}
                                            title="Eliminar"
                                        >
                                            <RiDeleteBin6Line className={styles.button__Delete} />
                                        </div>
                                    </div>
                                    <div className={`${styles.container__Data_Horizon} `}>
                                        <div className="m-0">
                                            <h6 className="m-0">Descripción</h6>
                                            <div>
                                                <p className={`${styles.title__Product} m-0 overflow-hidden`}>{product.itemName}</p>
                                            </div>
                                        </div>
                                        <div className="m-0">
                                            <h6 className="m-0">Sap</h6>
                                            <div>
                                                <p className="m-0">{product.itemCode}</p>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-4'>
                                            <div className="m-0">
                                                <h6 className="m-0">Precio Distribidor</h6>
                                                <div>
                                                    <p className="m-0">{product.sellingPrice ? <span>$ {formatNumber(product.sellingPrice)}</span> : 'No definido'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${styles.container__Section_Images_Horizon}`}>
                                        <h6>Imágenes</h6>
                                        <div className={`${styles.container__Images} d-flex flex-wrap align-items-start justify-content-between`}>
                                            <div className={`${styles.container__Main_Image} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <img src={product.mainImage} alt={`${product.itemName}`} className={`${styles.images} m-auto`} loading="lazy" />
                                            </div>
                                            <div className={`${styles.container__Main_Image} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                <img src={product.secondaryImage} alt={product.itemName} className={`${styles.images} m-auto`} loading="lazy" />
                                            </div>
                                            {Array.isArray(product.otherImages) && product.otherImages.map((image, index) => (
                                                <div key={`${product._id}-${index}`} className={`${styles.container__Secundaries_Image} d-flex align-items-center justify-content-center`} >
                                                    <img src={image} alt={`${index + 1}`} className={`${styles.images} m-auto`} loading="lazy" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} >
                        <Modal.Header closeButton onClick={() => setShowDeleteConfirmation(false)}>
                            <Modal.Title>Confirmación para eliminar la dirección</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ConfirmDeleteProduct
                                idProduct={idProduct}
                                onCloseModal={() => {onCloseModal()}}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductsTopDriveGroupPage;