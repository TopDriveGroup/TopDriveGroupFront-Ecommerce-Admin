/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { putManyProducts } from '../../../../redux/PanelTopDriveGroup/02Product/actions';
//ELEMENTOS DEL COMPONENTE
import { IProduct } from '../../../../types/product.types';
import NavBar from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function MassiveImageUpdatesPage() {
    const token = jsCookie.get('token') || '';

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const errorProduct = useSelector((state: RootState) => state.products.errorProduct);

    const { handleSubmit, reset } = useForm<IProduct>();
    const [formSubmitted, setFormSubmitted] = useState(false);

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

    // GENERAR EL "itemCode" A PARTIR DEL NOMBRE DE CADA IMAGEN
    const generateItemCode = (fileName: string): string => {
        const baseName = fileName.split(".")[0]; // Extraer el nombre sin extensión
        const paddedName = baseName.padStart(7, "0"); // Rellenar con ceros a la izquierda
        return paddedName;
    };

    // SUBIR LAS IMAGENES
    const uploadImages = async (): Promise<{ itemCode: string; mainImage: string; _id?: string }[]> => {
        if (imagesSelected.length) {
            try {
                const formDataArray = imagesSelected.map((image) => {
                    const formData = new FormData();
                    formData.append("file", image);
                    formData.append("upload_preset", "Products");
                    return formData;
                });
                const responses = await Promise.all(
                    formDataArray.map((formData) =>
                        axios.post(import.meta.env.VITE_CLOUDINARY_LOGO_CLIENTS, formData)
                    )
                );
                // Procesar las imágenes subidas
                return responses.map((response, index) => ({
                    itemCode: generateItemCode(imagesSelected[index].name),
                    mainImage: response.data.secure_url,
                }));
            } catch (error: any) {
                console.error("Error al subir imágenes:", error);
                throw new Error('Error al subir imágenes');
            }
        }
        return [];
    };

    // ENVIO DEL FORMULARIO
    const onSubmit = async () => {
        try {
            const uploadedImages = await uploadImages();
            if (uploadedImages.length === 0) return;
            const formData = uploadedImages.map((image) => ({
                ...image,
            }));
            await dispatch(putManyProducts(formData, token));
            setFormSubmitted(true);
            reset();
            setIsImageUploaded(true);
            setImagesSelected([]);
            setTimeout(() => {
                setFormSubmitted(false);
                setIsImageUploaded(false);
            }, 1500);
        } catch (errorProduct: any) {
            console.error("Error en la actualización masiva:", errorProduct);
            throw new Error('Error al subir imágenes');
        }
    };

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <h2 className={`${styles.main__Title} mb-3 text-start}`}>Actualización masiva de imágenes</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} d-flex flex-column align-items-center justify-content-center position-relative`} >
                        {formSubmitted && (
                            <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                        )}
                        {Array.isArray(errorProduct) && errorProduct.map((errorProduct, i) => (
                            <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{errorProduct}</div>
                        ))}
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
            <Footer />
        </div>
    );
}

export default MassiveImageUpdatesPage;