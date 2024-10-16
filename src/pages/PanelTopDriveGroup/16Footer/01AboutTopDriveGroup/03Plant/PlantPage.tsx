import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function PlantPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Planta</h1>
                    <p>En <span className={styles.topDriveGroup}>Top Drive Group</span> tenemos un completo inventario de nuestros productos, tenemos la posibilidad de establecer contratos marco de suministro cubriendo todos los segmentos (Industria, Oil & Gas, OEMs, Utilities) con las categorías de productos eléctricos, automatización e instrumentación.</p>
                    <p>Acompañamiento especializado de ingenieros de producto y aplicaciones con conocimientos en selección y configuración de equipos en las diferentes líneas.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PlantPage;