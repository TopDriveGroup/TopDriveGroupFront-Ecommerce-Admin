/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../../../../redux/PanelTopDriveGroup/02Product/actions';
import type { RootState, AppDispatch } from '../../../../redux/store';
//ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../types/product.types';
import NavBarTopDriveGroup from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import SelectProductClass from '../../../../helpers/CreateProducts/SelectProductClass/SelectProductClass';
import SelectProductGroups from '../../../../helpers/CreateProducts/SelectProductGroups/SelectProductGroups';
import SelectProductUnitMeasure from '../../../../helpers/CreateProducts/SelectProductUnitMeasures/SelectProductUnitMeasures';
import SelectProductsCategories from '../../../../helpers/CreateProducts/SelectProductsCategories/SelectProductsCategories';
import SelectProductsTypes from '../../../../helpers/CreateProducts/SelectProductsTypes/SelectProductsTypes';
import SelectProductManufacturers from '../../../../helpers/CreateProducts/selectProductManufacturers/selectProductManufacturers';
import { PiCaretUp, PiCaretDown } from "react-icons/pi";
import styles from './styles.module.css';

function CreateProductTopDriveGroupPage() {
    const token = jsCookie.get('token') || '';
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    const errorProduct = useSelector((state: RootState) => state.products.errorProduct);
    
    //SELECT DE LA CLASE DEL PRODUCTO
    const [selectedClass, setSelectedClass] = useState('');
    const [resetClass, setResetClass] = useState(false); 
    const handleSelectClass = (classT: string) => {
        setSelectedClass(classT);
    };
    
    //SELECT DEL GRUPO DEL PRODUCTO
    const [selectedGroup, setSelectedGroup] = useState('');
    const [resetGroup, setResetGroup] = useState(false); 
    const handleSelectGroup = (classT: string) => {
        setSelectedGroup(classT);
    };
    
    //SELECT DE LA UNIDAD DE MEDIDA DEL PRODUCTO
    const [selectedUnitMeasure, setSelectedUnitMeasure] = useState('');
    const [resetUnitMeasure, setResetUnitMeasure] = useState(false); 
    const handleSelectUnitMeasure = (classT: string) => {
        setSelectedUnitMeasure(classT);
    };
    
    //SELECT DE LA CATEGORIA DEL PRODUCTO
    const [selectedCategory, setSelectedCategory] = useState('');
    const [resetCategory, setResetCategory] = useState(false); 
    const handleSelectCategory = (classT: string) => {
        setSelectedCategory(classT);
    };
    
    //SELECT DEL TIPO DEL PRODUCTO
    const [selectedType, setSelectedType] = useState('');
    const [resetType, setResetType] = useState(false); 
    const handleSelectType = (classT: string) => {
        setSelectedType(classT);
    };
    
    //SELECT DEL FABRICANTE DEL PRODUCTO
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [resetManufacturer, setResetManufacturer] = useState(false); 
    const handleSelectManufacturers = (classT: string) => {
        setSelectedManufacturer(classT);
    };
    
    //SELECCIONA EL PORCENTAJE DE IVA DEL PRODUCTO
    const [iva, setIva] = useState<number>();
    const handleIva = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIva(Number(event.target.value));
    };

    //IMAGENES DEL PRODUCTO
    const [imagesSelected, setImagesSelected] = useState<File[]>([]);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files as FileList);
        setImagesSelected((prevImagesSelected) => [...prevImagesSelected, ...files]);
    };

    const handleRemoveImage = (image: File) => {
        setImagesSelected((prevImagesSelected) => prevImagesSelected.filter((img) => img !== image));
    };

    const handleDragEnter = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setImagesSelected((prevImagesSelected) => [...prevImagesSelected, ...files]);
        setIsDragging(false);
    };

    //SUBE LAS IMAGENES
    const uploadImages = async (): Promise<string[]> => {
        if (imagesSelected.length) {
            try {
                const formDataArray = imagesSelected.map((image) => {
                    const formData = new FormData();
                    formData.append('file', image);
                    formData.append('upload_preset', 'products');
                    return formData;
                });

                const responses = await Promise.all(formDataArray.map((formData) =>
                    axios.post(import.meta.env.VITE_CLOUDINARY_LOGO_CLIENTS, formData)
                ));

                const imageUrls = responses.map((response) => response.data.secure_url);
                setIsImageUploaded(true);
                setTimeout(() => {
                    setIsImageUploaded(false);
                }, 5000);
                setImagesSelected([]);
                return imageUrls;
            } catch (error: any) {
                throw new Error(error);
            }
        } else {
            return [];
        }
    };

    // Expansión de los inputs de Características Eléctricas
    const [electricalCharacteristics, setShowElectricalCharacteristics] = useState(false);
    function handleShowElectricalCharacteristics() {
        setShowElectricalCharacteristics(true);
    }
    function handleHideElectricalCharacteristics() {
        setShowElectricalCharacteristics(false);
    }

    // Expansión de los inputs de Características Ambientales
    const [environmentalCharacteristics, setShowEnvironmentalCharacteristics] = useState(false);
    function handleShowEnvironmentalCharacteristics() {
        setShowEnvironmentalCharacteristics(true);
    }
    function handleHideEnvironmentalCharacteristics() {
        setShowEnvironmentalCharacteristics(false);
    }

    // Expansión de los inputs de Características Estándares
    const [standardsCharacteristics, setShowStandardsCharacteristics] = useState(false);
    function handleShowStandardsCharacteristics() {
        setShowStandardsCharacteristics(true);
    }
    function handleHideStandardsCharacteristics() {
        setShowStandardsCharacteristics(false);
    }

    // Expansión de los inputs de Características de Documentación
    const [documentationCharacteristics, setShowDocumentationCharacteristics] = useState(false);
    function handleShowDocumentationCharacteristics() {
        setShowDocumentationCharacteristics(true);
    }
    function handleHideDocumentationCharacteristics() {
        setShowDocumentationCharacteristics(false);
    }

    //CREA EL PRODUCTO
    const onSubmit = async (values: IProduct) => {
        try {
            const images = await uploadImages();
            const formData = {
                ...values,
                class: selectedClass,
                group: selectedGroup,
                unitMeasure: selectedUnitMeasure,
                category: selectedCategory,
                type: selectedType,
                manufacturer: selectedManufacturer,
                iva: iva,
                images: images,
            } as IProduct;
            await dispatch(postProduct(formData, token));
            setFormSubmitted(true);
            reset();
            setTimeout(() => {
                setFormSubmitted(false);
                setShouldNavigate(true);
                setResetClass(true);
                setResetGroup(true);
                setResetUnitMeasure(true);
                setResetCategory(true);
                setResetType(true);
                setResetManufacturer(true);
                setTimeout(() => {
                    setResetClass(false);
                    setResetGroup(false);
                    setResetUnitMeasure(false);
                    setResetCategory(false);
                    setResetType(false);
                    setResetManufacturer(false);
                }, 10); // Se reinicia después de un corto período para asegurarse de que el reset haya tenido efecto
            }, 1500);
        } catch (errorProduct: any) {
            throw new Error(errorProduct);
        }
    };

    //REDIRECCIONA AL USUARIO LUEGO DE CREAR EL PRODUCTO
    useEffect(() => {
        if (shouldNavigate) {
            navigate('/panel-top-drive-group/products/consult');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div>
            <NavBarTopDriveGroup />
            <div className={`${styles.container} d-flex`}>
                <SideBar />
                <div className={`${styles.container__Component} m-auto p-4`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Crear productos</h2>

                    <Link to='/panel-top-drive-group/products/consult' >Consultar productos</Link>
                    <div className={`${styles.container__Product} m-auto d-flex align-items-center justify-content-between gap-4`}>
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} d-flex flex-column align-items-center justify-content-center position-relative`} >
                            {formSubmitted && (
                                <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                            )}
                            {Array.isArray(errorProduct) && errorProduct.map((errorProduct, i) => (
                                <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{errorProduct}</div>
                            ))}

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Código SAP</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('sap', { required: true })}
                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                        placeholder='Código SAP'
                                    />
                                    {errors.sap && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El código SAP es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                <SelectProductClass
                                    onSelect={handleSelectClass}
                                    reset={resetClass}
                                />
                                <SelectProductsCategories
                                    onSelect={handleSelectCategory}
                                    reset={resetCategory}
                                />
                            </div>

                            <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                <SelectProductsTypes
                                    onSelect={handleSelectType}
                                    reset={resetType}
                                />
                                <SelectProductGroups
                                    onSelect={handleSelectGroup}
                                    reset={resetGroup}
                                />
                            </div>

                            <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                <SelectProductManufacturers
                                    onSelect={handleSelectManufacturers}
                                    reset={resetManufacturer}
                                />
                            </div>

                            <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Inventario</h6>
                                    <div className={styles.container__Input}> 
                                        <input
                                            type="number"
                                            {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={`${styles.input} p-2 mb-4 border rounded`}
                                            placeholder='Inventario'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        {errors.inventory && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El inventario es requerido</p>
                                        )}
                                    </div>
                                </div>
                                <SelectProductUnitMeasure
                                    onSelect={handleSelectUnitMeasure}
                                    reset={resetUnitMeasure}
                                />
                            </div>

                            <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Familia</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('family', { required: true })}
                                            className={`${styles.input} p-2 mb-4 border rounded`}
                                            placeholder='Familia del producto'
                                        />
                                        {errors.family && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>La familia del producto es requerida</p>
                                        )}
                                    </div>
                                </div>

                                <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Serie</h6>
                                    <div className={styles.container__Input}> 
                                        <input
                                            type="text"
                                            {...register('series', { required: true })}
                                            className={`${styles.input} p-2 mb-4 border rounded`}
                                            placeholder='Serie del producto'
                                        />
                                        {errors.series && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>La serie del producto es requerida</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Referencia</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('reference', { required: true })}
                                            className={`${styles.input} p-2 mb-4 border rounded`}
                                            placeholder='Referencia del producto'
                                        />
                                        {errors.reference && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>La referencia del producto es requerida</p>
                                        )}
                                    </div>
                                </div>
                                <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Activo</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="text"
                                            {...register('active', { required: true })}
                                            className={`${styles.input} p-2 mb-4 border rounded`}
                                            placeholder='Activo'
                                        />
                                        {errors.active && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Descripción</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('description', { required: true })}
                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                        placeholder='Descripción del producto'
                                    />
                                    {errors.description && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La descripción del producto es requerida</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Descripción del fabricante</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="text"
                                        {...register('descriptionManufacturer', { required: true })}
                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                        placeholder='Descripción del fabricante'
                                    />
                                    {errors.descriptionManufacturer && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>La descripción del fabricante es requerida</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Largo</h6>
                                <div className={styles.container__Input}>
                                    <input
                                        type="number"
                                        {...register('long', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                        placeholder='Largo del producto'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.long && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El largo del producto es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>Precio de compra</h6>
                                    <div className={styles.container__Input}>
                                        <input
                                            type="number"
                                            {...register('purchasePrice', { required: true, setValueAs: (value) => parseFloat(value) })}
                                            className={`${styles.input} p-2 mb-4 border rounded`}
                                            placeholder='Precio de compra'
                                            min={0}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                        {errors.purchasePrice && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El precio de compra del producto es requerido</p>
                                        )}
                                    </div>
                                </div>

                                <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                    <h6 className={styles.label}>IVA</h6>
                                    <div className={styles.container__Input}>
                                        <select
                                            {...register('iva', { required: true })}
                                            className={`${styles.input} p-2 mb-4 border`}
                                            onChange={handleIva}
                                        >
                                            <option value={19}>19%</option>
                                            <option value={5}>5%</option>
                                            <option value={0}>0%</option>
                                        </select>
                                        {errors.iva && (
                                            <p className={`${styles.text__Danger} text-danger position-absolute`}>El IVA del producto es requerido</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Precio de venta a Distribuidor</h6>
                                <div className={styles.container__Input}> 
                                    <input
                                        type="number"
                                        {...register('sellingPriceDistributor', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                        placeholder='Precio de venta'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.sellingPriceDistributor && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El precio de venta es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Precio de venta a Integrador</h6>
                                <div className={styles.container__Input}> 
                                    <input
                                        type="number"
                                        {...register('sellingPriceIntegrators', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                        placeholder='Precio de venta'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.sellingPriceIntegrators && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El precio de venta es requerido</p>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Precio de venta a Usuario final</h6>
                                <div className={styles.container__Input}> 
                                    <input
                                        type="number"
                                        {...register('sellingPriceFinalUser', { required: true, setValueAs: (value) => parseFloat(value) })}
                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                        placeholder='Precio de venta'
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.sellingPriceFinalUser && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El precio de venta es requerido</p>
                                    )}
                                </div>
                            </div>


                            {/* CARACTERISTICAS ELECTRICAS */}
                            <div className={`${styles.container__Aditional_Properties} mb-4`}>
                                <div className={`${styles.aditional__Properties} pt-1 pb-1 px-0 d-flex align-items-center justify-content-between`}>
                                    <h6 className={styles.title__Aditional_Properties}>Características eléctricas</h6>
                                    {electricalCharacteristics === false && (
                                        <PiCaretDown className={`${styles.icon__Show} `} onClick={handleShowElectricalCharacteristics} />
                                    )}
                                    {electricalCharacteristics === true && (
                                        <PiCaretUp className={`${styles.icon__Show} `} onClick={handleHideElectricalCharacteristics} />
                                    )}
                                </div>

                                {electricalCharacteristics && (
                                    <div className="pt-2">
                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Tipo de tensión</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('tensionType')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Frecuencia</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('frequency', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Frecuencia'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Mínimo de tensión</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('minimumTension', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Mínimo de tensión'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Máximo de tensión</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('maximumTension', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Máximo de tensión'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Corriente de entradad</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('inputCurrent', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Corriente de entradad'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Corriente de salida</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('outputCurrent', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Corriente de salida'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Potencia</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('power', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Corriente de entradad'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Voltaje de potencia</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('powerVoltage', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Corriente de salida'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Caballaje</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('horsepower', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Corriente de entradad'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Voltaje de caballaje</h6>
                                                <div className={styles.container__Input}> 
                                                    <input
                                                        type="number"
                                                        {...register('horsepowerVoltage', { setValueAs: (value) => parseFloat(value) })}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Corriente de salida'
                                                        min={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* CARACTERISTICAS AMBIENTALES */}
                            <div className={`${styles.container__Aditional_Properties} mb-4`}>
                                <div className={`${styles.aditional__Properties} pt-1 pb-1 px-0 d-flex align-items-center justify-content-between`}>
                                    <h6 className={styles.title__Aditional_Properties}>Características ambientales</h6>
                                    {environmentalCharacteristics === false && (
                                        <PiCaretDown className={`${styles.icon__Show} `} onClick={handleShowEnvironmentalCharacteristics} />
                                    )}
                                    {environmentalCharacteristics === true && (
                                        <PiCaretUp className={`${styles.icon__Show} `} onClick={handleHideEnvironmentalCharacteristics} />
                                    )}
                                </div>

                                {environmentalCharacteristics && (
                                    <div className="pt-2">
                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Eficiencia</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('efficiency')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Ip</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('ip')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* CARACTERISTICAS ESTANDARES */}
                            <div className={`${styles.container__Aditional_Properties} mb-4`}>
                                <div className={`${styles.aditional__Properties} pt-1 pb-1 px-0 d-flex align-items-center justify-content-between`}>
                                    <h6 className={styles.title__Aditional_Properties}>Características estándares</h6>
                                    {standardsCharacteristics === false && (
                                        <PiCaretDown className={`${styles.icon__Show} `} onClick={handleShowStandardsCharacteristics} />
                                    )}
                                    {standardsCharacteristics === true && (
                                        <PiCaretUp className={`${styles.icon__Show} `} onClick={handleHideStandardsCharacteristics} />
                                    )}
                                </div>

                                {standardsCharacteristics && (
                                    <div className="pt-2">
                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Estándar</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('standard')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Protocolo</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('protocol')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* CARACTERISTICAS DOCUMENTACION */}
                            <div className={`${styles.container__Aditional_Properties} mb-4`}>
                                <div className={`${styles.aditional__Properties} pt-1 pb-1 px-0 d-flex align-items-center justify-content-between`}>
                                    <h6 className={styles.title__Aditional_Properties}>Características de documentación</h6>
                                    {documentationCharacteristics === false && (
                                        <PiCaretDown className={`${styles.icon__Show} `} onClick={handleShowDocumentationCharacteristics} />
                                    )}
                                    {documentationCharacteristics === true && (
                                        <PiCaretUp className={`${styles.icon__Show} `} onClick={handleHideDocumentationCharacteristics} />
                                    )}
                                </div>

                                {documentationCharacteristics && (
                                    <div className="pt-2">
                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Aplicaciones</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('applications')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Página</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('page')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Web</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('web')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                                <h6 className={styles.label}>Link de ficha técnica del fabricante</h6>
                                                <div className={styles.container__Input}>
                                                    <input
                                                        type="text"
                                                        {...register('datasheet')}
                                                        className={`${styles.input} p-2 mb-4 border rounded`}
                                                        placeholder='Tipo de tensión del producto'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`${styles.container__Images} p-4 d-flex flex-column align-items-center justify-content-center position-relative gap-4`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <h3>Imágenes</h3>
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                        hidden
                                    />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className={`${styles.button__attach} pt-2 pb-2 px-4 border-0 rounded`} >Adjuntar imágenes</button>
                                </div>

                                <div className={`${styles.dragAndDrop} ${isDragging ? styles.dragging : ""} mt-4 mb-4 d-flex align-items-center justify-content-center`}>
                                    <div className={styles.dragAndDrop__Message}>
                                        <p className="m-0">Puedes arrastrar y soltar las imágenes aquí</p>
                                    </div>
                                </div>

                                {(imagesSelected.length > 0 || isDragging) && (
                                    <div>
                                        <div className={`${styles.container__Image_Preview} mb-4 d-flex align-items-center justify-content-center flex-wrap gap-3`}>
                                            {imagesSelected.map((image, index) => (
                                                <div key={index} className={`${styles.image__Preview} p-2 d-flex flex-column align-items-center justify-content-center position-relative`}>
                                                    <img className={`${styles.imagenes}`} src={URL.createObjectURL(image)} alt={`Preview of ${image.name}`} loading="lazy" />
                                                    <p className='m-0'>{image.name}</p>
                                                    <button className={`${styles.button__Remove} d-flex align-items-center justify-content-center position-absolute border-0`} onClick={() => handleRemoveImage(image)}>X</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {isImageUploaded && <p className={`${styles.image__Uploaded_Message} position-absolute`}>Imagen o imágenes enviadas</p>}
                            </div>

                            <div className="d-flex mb-2">
                                <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateProductTopDriveGroupPage;