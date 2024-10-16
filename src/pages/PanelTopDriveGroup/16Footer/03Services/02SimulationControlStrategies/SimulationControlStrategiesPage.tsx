import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import SimulacionControl from '../../../../../assets/SimulacionControl.png';
import styles from './styles.module.css';

function SimulationControlStrategiesPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Estrategias de simulación y control</h1>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                    <img src={SimulacionControl} alt="Simulacion y Control" loading="lazy" />
                </div>

                <div className={`${styles.container__Component} mb-4 d-flex gap-4`}>
                    FORMULARIO
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SimulationControlStrategiesPage;