import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import styles from './styles.module.css';

interface PaginatedProps {
    totalProducts: number;
    limit: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

function Paginated({ totalProducts, limit, onPageChange, currentPage }: PaginatedProps) {
    const totalPages = Math.ceil(totalProducts / limit);

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Determinar qué páginas mostrar
    const pagesToShow = () => {
        const pages = [];

        if (totalPages <= 6) {
            // SI HAY 6 O MAS, MOSTRAR TODAS
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // SI ESTAMOS EN LA PRIMERA PAGINA
            if (currentPage === 1) {
                pages.push(1, 2, 3);
                if (totalPages > 3) {
                    pages.push(null);                           // Indica que hay páginas intermedias
                    pages.push(totalPages);
                }
            }
            // SI ESTAMOS EN LA ULTIMA
            else if (currentPage === totalPages) {
                pages.push(1);
                if (totalPages > 4) {
                    pages.push(null);                           // Indica que hay páginas intermedias
                    pages.push(totalPages - 2, totalPages - 1);
                }
                pages.push(totalPages);
            }
            // SI ESTAMOS EN LA SEGUNDA
            else if (currentPage === 2) {
                pages.push(1, 2, 3);
                if (totalPages > 3) {
                    pages.push(null);                           // Indica que hay páginas intermedias
                    pages.push(totalPages);
                }
            }
            // SI ESTAMOS EN LA TERCERA
            else if (currentPage === 3) {
                pages.push(1, 2, 3, 4);
                if (totalPages > 4) {
                    pages.push(null);                           // Indica que hay páginas intermedias
                    pages.push(totalPages);
                }
            }
            // SI ESTAMOS EN UNA PAGINA INTERMEDIA (4 o más)
            else {
                pages.push(1);
                if (currentPage > 4) pages.push(null);          // Indica que hay páginas intermedias
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    if (i > 1 && i < totalPages) pages.push(i);
                }
                if (currentPage < totalPages - 3) {
                    pages.push(null);                           // Indica que hay páginas intermedias
                    pages.push(totalPages);
                } else if (currentPage === totalPages - 3) {
                    pages.push(totalPages - 2, totalPages);
                } else if (currentPage === totalPages - 2) pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className={`${styles.container} d-flex align-items-center justify-content-between`}>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className={`${styles.container__Button__Next_Prev} d-flex align-items-center justify-content-center ${currentPage === 1 ? styles.disabled : ''}`}>
                <GrFormPrevious />
            </button>
    
            <div className={`${styles.container__Pages} d-flex align-items-center justify-content-between overflow-hidden`}>
                {pagesToShow().map((page, index) => (
                    page ? (
                        <button key={page} onClick={() => handlePageChange(page)} className={`${currentPage === page ? styles.active : styles.inactive} border-0`}>
                            <div className={`${styles.pages} d-flex align-items-center justify-content-center`}>{page}</div>
                        </button>
                    ) : (
                        <span key={`ellipsis-${index}`} className={`${styles.ellipsis}`}>...</span>
                    )
                ))}
            </div>
    
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`${styles.container__Button__Next_Prev} d-flex align-items-center justify-content-center ${currentPage === totalPages ? styles.disabled : ''}`}>
                <GrFormNext />
            </button>
        </div>
    );
}

export default Paginated;