import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

interface CloudinaryImagesProps {
    setImageUrls: (urls: string[]) => void;
}

export interface CloudinaryImagesHandle {
    uploadImages: () => Promise<void>;
    getImageUrls: () => string[];
}

const CloudinaryImages = forwardRef<CloudinaryImagesHandle, CloudinaryImagesProps>(({ setImageUrls }, ref) => {
    const [imagesSelected, setImagesSelected] = useState<File[]>([]);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        uploadImages,
        getImageUrls: () => imagesSelected.map((image) => URL.createObjectURL(image))
    }));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files as FileList);
        setImagesSelected((prevImagesSelected) => [...prevImagesSelected, ...files]);
    };

    const handleRemoveImage = (image: File) => {
        setImagesSelected((prevImagesSelected) => prevImagesSelected.filter((img) => img !== image));
    };

    const uploadImages = async () => {
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
                setImageUrls(imageUrls);
                setIsImageUploaded(true);
                setTimeout(() => {
                    setIsImageUploaded(false);
                }, 5000);
                setImagesSelected([]);
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
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

    return (
        <div
            className={`${styles.container__Component} p-4 d-flex flex-column align-items-center justify-content-center position-relative gap-4`}
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
                <button onClick={() => fileInputRef.current?.click()} className={`${styles.button__attach} pt-2 pb-2 px-4 border-0 rounded`}>Adjuntar imágenes</button>
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
    );
});

export default CloudinaryImages;