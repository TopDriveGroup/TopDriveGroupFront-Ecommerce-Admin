import React, { useState } from 'react';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import styles from './styles.module.css';

interface SliderZoomProps {
    images: string[];
}

function SliderZoom({ images }: SliderZoomProps) {
    // Definimos el nivel de zoom
    const zoomLevel = 1.4;

    // Estado para manejar la selección de imagen
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Estados para manejar la posición del cursor y el zoom
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);

    // Limitar el número de imágenes a 4
    const limitedImages = images.slice(0, 4);

    // Evento para manejar el movimiento del ratón
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setZoomPosition({ x, y });
        setIsZooming(true);
    };

    // Evento para manejar la salida del ratón
    const handleMouseLeave = () => {
        setIsZooming(false);
    };

    // Calcular backgroundPosition para centrar la imagen en el recuadro de zoom
    const calculateBackgroundPosition = () => {
        const adjustedX = zoomPosition.x * zoomLevel - 270; //Define las coordenadas en el eje X
        const adjustedY = zoomPosition.y * zoomLevel - 180; //Define las coordenadas en el eje Y

        return `${-adjustedX}px ${-adjustedY}px`;
    };

    // Función para pasar a la imagen anterior
    const goToPreviousImage = () => {
        setSelectedImageIndex((prevIndex) => {
            return prevIndex > 0 ? prevIndex - 1 : prevIndex;
        });
    };

    // Función para pasar a la siguiente imagen
    const goToNextImage = () => {
        setSelectedImageIndex((prevIndex) => {
            return prevIndex < limitedImages.length - 1 ? prevIndex + 1 : prevIndex;
        });
    };

    return (
        <div className={`${styles.container} d-flex gap-2`} >
            <div className={`${styles.images__Small_Container} d-flex flex-column align-items-center justify-content-start`}>
                {/* Renderizamos las imágenes pequeñas */}
                {limitedImages.map((url, index) => (
                    <div
                        key={index}
                        className={`${styles.small__Container} ${index === selectedImageIndex ? styles.active : ''} d-flex align-items-center justify-content-center overflow-hidden`}
                        onClick={() => setSelectedImageIndex(index)}
                    >
                        <img src={url} alt={`Foto ${index + 1}`} className={styles.image__Small} loading="lazy" />
                    </div>
                ))}
            </div>
            <div className={`${styles.image__Container} d-flex align-items-center justify-content-center position-relative`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} >
                {/* Botones de navegación */}
                {/* Botón de anterior: se muestra solo si no se está en la primera imagen */}
                {selectedImageIndex > 0 && (
                    <button className={`${styles.button__Prev} p-2 border-0 position-absolute`} onClick={goToPreviousImage}>
                        <GrFormPrevious className={styles.icon} />
                    </button>
                )}
                <div>
                    {limitedImages[selectedImageIndex] && (
                        <img src={limitedImages[selectedImageIndex]} alt={`Foto ${selectedImageIndex + 1}`} className={styles.image} loading="lazy" />
                    )}
                    {isZooming && limitedImages[selectedImageIndex] && (
                        <div
                            className={`${styles.zoom__Box} position-absolute top-0`}
                            style={{
                                '--zoom-background-image': `url(${limitedImages[selectedImageIndex]})`,
                                '--zoom-background-size': `${zoomLevel * 65}%`,
                                '--zoom-background-position': calculateBackgroundPosition(),
                            } as React.CSSProperties}
                        />
                    )}
                </div>
                {/* Botón de siguiente: se muestra solo si no se está en la última imagen */}
                {selectedImageIndex < limitedImages.length - 1 && (
                    <button className={`${styles.button__Next} p-2 border-0 position-absolute`} onClick={goToNextImage}>
                        <GrFormNext className={styles.icon} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SliderZoom;
