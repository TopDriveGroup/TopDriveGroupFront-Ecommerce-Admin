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
                                {...register('itemCode', { required: true })}
                                defaultValue={productToUpdate?.sap}
                                className={`${styles.input} p-2 border rounded`}
                                placeholder='Tu dirección'
                                readOnly={true}
                            />
                            {errors.itemCode && (
                                <p className={`${styles.textDanger} text-danger position-absolute`}>El código SAP es requerida</p>
                            )}
                        </div>

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Descripción</h6>
                            <input
                                type="text"
                                {...register('itemName', { required: true })}
                                defaultValue={productToUpdate?.itemName}
                                className={`${styles.input} p-2 mb-4 border rounded`}
                                placeholder='Descripción del producto'
                            />
                            {errors.itemName && (
                                <p className={`${styles.text__Danger} text-danger position-absolute`}>La descripción del producto es requerida</p>
                            )}
                        </div>

                        <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                            <h6 className={styles.label}>Descripción del fabricante</h6>
                            <input
                                type="text"
                                {...register('manufacturerDescription', { required: true })}
                                defaultValue={productToUpdate?.manufacturerDescription}
                                className={`${styles.input} p-2 mb-4 border rounded`}
                                placeholder='Descripción del fabricante'
                            />
                            {errors.manufacturerDescription && (
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

                        <SelectProductManufacturers
                            onSelect={handleSelectManufacturers}
                            reset={resetManufacturer}
                            initialProductManufacturers={productToUpdate.manufacturer}
                        />

                        <SelectProductUnitMeasure
                            onSelect={handleSelectUnitMeasure}
                            reset={resetUnitMeasure}
                            initialUnitMeasure={productToUpdate.unitMeasure}
                        />

                        <div className={`${styles.container__Inputs} d-flex align-items-center justify-content-center gap-3`}>
                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Referencia</h6>
                                <input
                                    type="text"
                                    {...register('supplierCatalogNo', { required: true })}
                                    defaultValue={productToUpdate?.supplierCatalogNo}
                                    className={`${styles.input} p-2 mb-4 border rounded`}
                                    placeholder='Referencia del producto'
                                />
                                {errors.supplierCatalogNo && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>La referencia del producto es requerida</p>
                                )}
                            </div>
                            <div className={`${styles.container__Inputs} d-flex flex-column align-items-start justify-content-start position-relative`}>
                                <h6 className={styles.label}>Activo</h6>
                                <input
                                    type="text"
                                    {...register('valid', { required: true })}
                                    defaultValue={productToUpdate?.valid}
                                    className={`${styles.input} p-2 mb-4 border rounded`}
                                    placeholder='Activo'
                                />
                                {errors.valid && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>Este dato es requerido</p>
                                )}
                            </div>
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