import styles from './styles.module.css';

function Loading() {

    return (
        <div className={`${styles.container} m-auto d-flex align-items-center justify-content-center`}>
            <div className="text-center">
                <div className={`${styles.role} spinner-border spinner-border-lg`} role="status">
                    <span className="sr-only" ></span>
                </div>
                <p className={`${styles.text} m-0`}>Cargando...</p>
            </div>
        </div>
    );
}

export default Loading;