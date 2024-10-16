import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function CoveragePage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Cobertura</h1>
                    <p>Somos una empresa con amplia experiencia en integrar soluciones en diseño, ensamble, montaje, puesta en marcha y adicionalmente comercialización y distribución de equipos y materiales eléctricos. Brindando nuestro conocimiento a través de las mejores prácticas para las industrias que apoyamos, en Estados Unidos, Colombia y Perú.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CoveragePage;