import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function ForeignTradePage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Comercio Exterior</h1>
                    <p>En <span className={styles.topDriveGroup}>Top Drive Group</span> tenemos experiencia que nos permite poner a su disposición toda una serie de estrategias y soluciones en materia de comercio exterior.</p>
                </div>

                <div>
                    <p>Si quieres poner a prueba nuestra experiencia ejecutando procesos de importación o exportación, diligencia el siguiente formulario, te daremos respuesta lo más pronto posible</p>

                    <div>FORMULARIO DE COMERCIO EXTERIOR</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ForeignTradePage;