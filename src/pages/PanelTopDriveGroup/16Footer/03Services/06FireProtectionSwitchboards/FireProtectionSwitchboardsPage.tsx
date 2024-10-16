import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function FireProtectionSwitchboardsPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Protección contra incendios de tableros</h1>
                    <p>El SEVOTM FlexTM que utiliza el fluido de protección contra incendios 3M TM NovecTM 1230 ofrece la flexibilidad sin precedentes de proporcionar una protección localizada de equipos de alto valor para una máxima eficiencia y rentabilidad.</p>
                    <p>SEVOTM FlexTM está diseñado para cumplir con el tiempo de descarga rápida (hasta 10 segundos) de acuerdo con la NFPA 2001. Multi-Point proporciona una inundación parcial/local de uno o varios peligros.</p>
                    <p>- Se instala directamente en los equipos de riesgo</p>
                    <p>- Detecta y suprime automáticamente el fuego en cuanto se inicia</p>
                    <p>- Reduce los daños en los equipos y el tiempo de inactividad</p>
                    <p>- Muy fiable: sin electricidad ni piezas móviles</p>
                    <p>- Fácil y sencillo de instalar</p>
                </div>

                <div className={`${styles.container__Component} mb-4 d-flex gap-4`}>
                    FORMULARIO
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FireProtectionSwitchboardsPage;