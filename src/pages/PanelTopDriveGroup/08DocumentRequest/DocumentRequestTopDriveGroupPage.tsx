import NavBarTopDriveGroup from '../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../components/PanelTopDriveGroup/Footer/Footer';
import SideBar from '../../../components/PanelTopDriveGroup/SideBar/SideBar';
import styles from './styles.module.css';

function DocumentRequestTopDriveGroupPage() {
    
    return (
        <div>
            <NavBarTopDriveGroup />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Solicitud de documentos</h2>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DocumentRequestTopDriveGroupPage;