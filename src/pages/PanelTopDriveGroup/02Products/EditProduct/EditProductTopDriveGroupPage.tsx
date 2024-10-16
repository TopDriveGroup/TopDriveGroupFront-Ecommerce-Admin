import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { putProduct } from '../../../../redux/PanelTopDriveGroup/02Product/actions';
//ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../types/product.types';
import NavBar from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import SelectProductClass from '../../../../helpers/CreateProducts/SelectProductClass/SelectProductClass';
import SelectProductGroups from '../../../../helpers/CreateProducts/SelectProductGroups/SelectProductGroups';
import SelectProductUnitMeasure from '../../../../helpers/CreateProducts/SelectProductUnitMeasures/SelectProductUnitMeasures';
import SelectProductsCategories from '../../../../helpers/CreateProducts/SelectProductsCategories/SelectProductsCategories';
import SelectProductsTypes from '../../../../helpers/CreateProducts/SelectProductsTypes/SelectProductsTypes';
import SelectProductManufacturers from '../../../../helpers/CreateProducts/selectProductManufacturers/selectProductManufacturers';
import { IoChevronBack } from "react-icons/io5";
import { PiCaretUp, PiCaretDown } from "react-icons/pi";
import styles from './styles.module.css';

function EditProductTopDriveGroupPage() {
    const token = jsCookie.get('token') || '';
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const errorProduct = useSelector((state: RootState) => state.products.errorProduct);
    
    const location = useLocation();
    const productToUpdate = location.state?.productToUpdate;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IProduct>();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

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

    const onSubmit = async (values: IProduct) => {
        try {
            const formData = {
                ...values,
                class: selectedClass,
                group: selectedGroup,
                unitMeasure: selectedUnitMeasure,
                category: selectedCategory,
                type: selectedType,
                manufacturer: selectedManufacturer,
                iva: iva,
            } as IProduct;
            await dispatch(putProduct(productToUpdate._id, formData, token));
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
                    setResetClass(true);
                    setResetGroup(false);
                    setResetUnitMeasure(false);
                    setResetCategory(false);
                    setResetType(false);
                    setResetManufacturer(false);
                }, 10); 
            }, 1500);
        } catch (error) {
            throw new Error('Error al guardar cambios');
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/panel-top-drive-group/products/consult');
        }
    }, [ shouldNavigate, navigate ]);

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Editar producto</h2>

                    <Link to='/panel-top-drive-group/products/consult' className={`${styles.button__Back} text-decoration-none`}><IoChevronBack className={`${styles.icon__Back} `}/> Atrás</Link>
                
                    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} m-auto position-relative`}>
                        {formSubmitted && (
                            <div className={`${styles.alertSuccess} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                        )}
                        {Array.isArray(errorProduct) && errorProduct.map((error, i) => (
                            <div key={i} className={`${styles.alertDanger} text-center position-absolute alert-danger`}>{error}</div>
                        ))}

                        <div className={`${styles.container__Inputs} mb-4 d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Código SAP</h6>
                            <input
                                type="text"
                                {...register('sap', { required: true })}
                                defaultValue={productToUpdate?.sap}
                                className={`${styles.input} p-2 border rounded`}
                                placeholder='Tu dirección'
                                readOnly={true}
                            />
                            {errors.sap && (
                                <p className={`${styles.textDanger} text-danger position-absolute`}>El código SAP es requerida</p>
                            )}
                        </div>

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Descripción</h6>
                            <input
                                type="text"
                                {...register('description', { required: true })}
                                defaultValue={productToUpdate?.description}
                                className={`${styles.input} p-2 mb-4 border rounded`}
                                placeholder='Descripción del producto'
                            />
                            {errors.description && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>La descripción del producto es requerida</p>
                            )}
                        </div>

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Descripción del fabricante</h6>
                            <input
                                type="text"
                                {...register('descriptionManufacturer', { required: true })}
                                defaultValue={productToUpdate?.descriptionManufacturer}
                                className={`${styles.input} p-2 mb-4 border rounded`}
                                placeholder='Descripción del fabricante'
                            />
                            {errors.descriptionManufacturer && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>La descripción del fabricante es requerida</p>
                            )}
                        </div>

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <SelectProductClass
                                onSelect={handleSelectClass}
                                reset={resetClass}
                                initialClass={productToUpdate.class}
                            />
                            <SelectProductsCategories
                                onSelect={handleSelectCategory}
                                reset={resetCategory}
                                initialProductsCategories={productToUpdate.category}
                            />
                        </div>

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <SelectProductsTypes
                                onSelect={handleSelectType}
                                reset={resetType}
                                initialProductsTypes={productToUpdate.type}
                            />
                            <SelectProductGroups
                                onSelect={handleSelectGroup}
                                reset={resetGroup}
                                initialGroup={productToUpdate.group}
                            />
                        </div>

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <SelectProductManufacturers
                                onSelect={handleSelectManufacturers}
                                reset={resetManufacturer}
                                initialProductManufacturers={productToUpdate.manufacturer}
                            />
                        </div>

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Inventario</h6>
                                <input
                                    type="number"
                                    {...register('inventory', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    defaultValue={productToUpdate?.inventory}
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
                            <SelectProductUnitMeasure
                                onSelect={handleSelectUnitMeasure}
                                reset={resetUnitMeasure}
                                initialUnitMeasure={productToUpdate.unitMeasure}
                            />
                        </div>

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Familia</h6>
                                <input
                                    type="text"
                                    {...register('family', { required: true })}
                                    defaultValue={productToUpdate?.family}
                                    className={`${styles.input} p-2 mb-4 border rounded`}
                                    placeholder='Familia del producto'
                                />
                                {errors.family && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La familia del producto es requerida</p>
                                )}
                            </div>

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Serie</h6>
                                <input
                                    type="text"
                                    {...register('series', { required: true })}
                                    defaultValue={productToUpdate?.series}
                                    className={`${styles.input} p-2 mb-4 border rounded`}
                                    placeholder='Serie del producto'
                                />
                                {errors.series && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La serie del producto es requerida</p>
                                )}
                            </div>
                        </div>

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Referencia</h6>
                                <input
                                    type="text"
                                    {...register('reference', { required: true })}
                                    defaultValue={productToUpdate?.reference}
                                    className={`${styles.input} p-2 mb-4 border rounded`}
                                    placeholder='Referencia del producto'
                                />
                                {errors.reference && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La referencia del producto es requerida</p>
                                )}
                            </div>
                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Activo</h6>
                                <input
                                    type="text"
                                    {...register('active', { required: true })}
                                    defaultValue={productToUpdate?.active}
                                    className={`${styles.input} p-2 mb-4 border rounded`}
                                    placeholder='Activo'
                                />
                                {errors.active && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                )}
                            </div>
                        </div>



   

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Largo</h6>
                            <input
                                type="number"
                                {...register('long', { required: true, setValueAs: (value) => parseFloat(value) })}
                                defaultValue={productToUpdate?.long}
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

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Precio de compra</h6>
                                <input
                                    type="number"
                                    {...register('purchasePrice', { required: true, setValueAs: (value) => parseFloat(value) })}
                                    defaultValue={productToUpdate?.purchasePrice}
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

                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>IVA</h6>
                                <select
                                    {...register('iva', { required: true })}
                                    defaultValue={productToUpdate?.iva}
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

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Precio de venta a Distribuidor</h6>
                            <input
                                type="number"
                                {...register('sellingPriceDistributor', { required: true, setValueAs: (value) => parseFloat(value) })}
                                defaultValue={productToUpdate?.sellingPriceDistributor}
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

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Precio de venta a Integrador</h6>
                            <input
                                type="number"
                                {...register('sellingPriceIntegrators', { required: true, setValueAs: (value) => parseFloat(value) })}
                                defaultValue={productToUpdate?.sellingPriceIntegrators}
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

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Precio de venta a Usuario final</h6>
                            <input
                                type="number"
                                {...register('sellingPriceFinalUser', { required: true, setValueAs: (value) => parseFloat(value) })}
                                defaultValue={productToUpdate?.sellingPriceFinalUser}
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
                                            <input
                                                type="text"
                                                {...register('tensionType')}
                                                defaultValue={productToUpdate?.tensionType}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Frecuencia</h6>
                                            <input
                                                type="number"
                                                {...register('frequency', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.frequency}
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

                                    <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Mínimo de tensión</h6>
                                            <input
                                                type="number"
                                                {...register('minimumTension', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.minimumTension}
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

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Máximo de tensión</h6>
                                            <input
                                                type="number"
                                                {...register('maximumTension', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.maximumTension}
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

                                    <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Corriente de entradad</h6>
                                            <input
                                                type="number"
                                                {...register('inputCurrent', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.inputCurrent}
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

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Corriente de salida</h6>
                                            <input
                                                type="number"
                                                {...register('outputCurrent', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.outputCurrent}
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

                                    <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Potencia</h6>
                                            <input
                                                type="number"
                                                {...register('power', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.power}
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

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Voltaje de potencia</h6>
                                            <input
                                                type="number"
                                                {...register('powerVoltage', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.powerVoltage}
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

                                    <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Caballaje</h6>
                                            <input
                                                type="number"
                                                {...register('horsepower', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.horsepower}
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

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Voltaje de caballaje</h6>
                                            <input
                                                type="number"
                                                {...register('horsepowerVoltage', { setValueAs: (value) => parseFloat(value) })}
                                                defaultValue={productToUpdate?.horsepowerVoltage}
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
                                            <input
                                                type="text"
                                                {...register('efficiency')}
                                                defaultValue={productToUpdate?.efficiency}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Ip</h6>
                                            <input
                                                type="text"
                                                {...register('ip')}
                                                defaultValue={productToUpdate?.ip}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
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
                                            <input
                                                type="text"
                                                {...register('standard')}
                                                defaultValue={productToUpdate?.standard}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Protocolo</h6>
                                            <input
                                                type="text"
                                                {...register('protocol')}
                                                defaultValue={productToUpdate?.protocol}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
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
                                            <input
                                                type="text"
                                                {...register('applications')}
                                                defaultValue={productToUpdate?.applications}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Página</h6>
                                            <input
                                                type="text"
                                                {...register('page')}
                                                defaultValue={productToUpdate?.page}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
                                        </div>
                                    </div>

                                    <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Web</h6>
                                            <input
                                                type="text"
                                                {...register('web')}
                                                defaultValue={productToUpdate?.web}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
                                        </div>

                                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                            <h6 className={styles.label}>Link de ficha técnica del fabricante</h6>
                                            <input
                                                type="text"
                                                {...register('datasheet')}
                                                defaultValue={productToUpdate?.datasheet}
                                                className={`${styles.input} p-2 mb-4 border rounded`}
                                                placeholder='Tipo de tensión del producto'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="d-flex align-items-center justify-content-center">
                            <button type='submit' className={`${styles.button__Submit} border-0 rounded text-decoration-none`} >Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditProductTopDriveGroupPage;