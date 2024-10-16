import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function IndustrialAutomationPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Automatización industrial</h1>
                    <p>- Diseño de estrategias de control avanzado apoyadas en la simulación dinámica de procesos.</p>
                    <p>- Minería de datos y reportes automáticos.</p>
                    <p>- Diseño de aplicaciones HMI de alto desempeño.</p>
                </div>

                <div className={`${styles.container__Component} mb-4 d-flex gap-4`}>
                    FORMULARIO
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default IndustrialAutomationPage;