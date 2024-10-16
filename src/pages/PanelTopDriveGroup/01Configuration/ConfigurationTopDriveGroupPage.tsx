//ELEMENTOS DEL COMPONENTE
import NavBar from '../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import SideBar from '../../../components/PanelTopDriveGroup/SideBar/SideBar';
import Footer from '../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function ConfigurationTopDriveGroupPage() {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Configuración</h2>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ConfigurationTopDriveGroupPage;