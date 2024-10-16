import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function LightingPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Iluminación</h1>
                    <p>Suministro y montajes de Luminarias para Áreas clasificadas e Industriales, Diseños de Iluminación, Asesoramiento y capacitación de sistemas de Iluminación y nuevas tecnologías.</p>
                </div>

                <div className={`${styles.container__Component} mb-4 d-flex gap-4`}>
                    FORMULARIO
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LightingPage;