import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Services() {

    return (
        <div className={`${styles.container} mb-2 mt-2 m-auto`}>
            <h1 className={`${styles.main__Title} text-center`}>Servicios</h1>

            <div className={`${styles.container__Services} d-flex align-items-center justify-content-center gap-5`}>
                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>AUTOMATIZACIÓN INDUSTRIAL</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/industrial-automation" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div> 
                </div>

                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>ILUMINACIÓN</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/illumination" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div> 
                </div>

                <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>OPTIMIZACIÓN ENERGÉTICA PARA PROYECTOS ELÉCTRICOS Y DATACENTERS</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/solutions/cables" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div>
                </div>

                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>ALQUILER DE HERRAMIENTASS PARA MANEJO Y HALADO DE CABLES</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/cables" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div>
                </div>

                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>SOLUCIONES EN ENERGÍAS RENOVABLES – FOTOVOLTAICOS</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/cables" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div> 
                </div>

                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>MONTAJES ELÉCTRICOS</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/cables" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div> 
                </div>

                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>CONTRATOS MARCO DE SUMINISTRO EN INSTALACIÓN DE EQUIPOS</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/cables" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div> 
                </div>

                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>MONTAJES DE REDES DE COMUNICACIONES - FIBRA ÓPTICA</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/cables" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div> 
                </div>

                 <div className={`${styles.service} p-3 d-flex flex-column align-items-center justify-content-between`}>
                    <h4 className={`${styles.title__section} text-center`}>COMERCIO EXTERIOR</h4>
                    <div className={`${styles.container__link__Button} d-flex align-items-center justify-content-center`}>
                        <Link to="/services/cables" className={`${styles.link__Button} text-decoration-none`} >SOLICITAR SERVICIO</Link>
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Services