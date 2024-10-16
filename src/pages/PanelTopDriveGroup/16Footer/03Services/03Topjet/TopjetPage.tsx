import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function TopjetPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Topjet</h1>
                    <p><span className={styles.topDriveGroup}>Top Drive Group</span> – TOPJET maximiza el rendimiento del suministro de aire. El flujo continuo de hielo seco minimiza la sublimación y los residuos El sistema avanzado de flujo de aire minimiza la pérdida de presión dentro de la máquina y maximiza el suministro de aire disponible.</p>
                    <p>La limpieza criogénica es responsable con el medio ambiente y realmente respetuosa con él. Para cumplir nuestra misión de proporcionar valor y proteger el medio ambiente, nuestros equipos utilizan medios inertes, no conductores, no corrosivos y que no se suman al flujo de residuos peligrosos. Mejora las condiciones de trabajo y la salud y seguridad de la mano de obra. Utiliza más contenido reciclado y renovable en el producto y el embalaje.</p>
                </div>

                <div className={`${styles.container__Component} mb-4 d-flex gap-4`}>
                    FORMULARIO
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TopjetPage;