import Error_404 from '../../assets/Error404/Error404.svg';
import NavBar from '../../components/PanelTopDriveGroup/01NavBar/NavBar';
import styles from './styles.module.css';

function Error404() {
    
    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex flex-column align-items-center justify-content-center`}>
                <div className='p-4'>
                    <img src={Error_404} alt="Error 404" loading="lazy" />
                    <h1 className='display-1'>¡Ups!</h1>
                    <p className='lead'>No hemos podido encontrar la página que buscas</p>
                </div>
            </div>
        </div>
    );
}

export default Error404;