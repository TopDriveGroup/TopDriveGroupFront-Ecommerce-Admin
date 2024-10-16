import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function OpticFiberInstallationPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>              
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Montajes de fibra óptica</h1>
                    <p>Tendido y empalme en redes de Fibra Óptica ADSS, OPGW, Armadas y de Uso Industrial, Revisión, Adecuación y arreglo de redes de Fibra Óptica existentes, Certificación de Fibra Óptica.</p>
                </div>

                <div className={`${styles.container__Component} mb-4 d-flex gap-4`}>
                    FORMULARIO
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OpticFiberInstallationPage;