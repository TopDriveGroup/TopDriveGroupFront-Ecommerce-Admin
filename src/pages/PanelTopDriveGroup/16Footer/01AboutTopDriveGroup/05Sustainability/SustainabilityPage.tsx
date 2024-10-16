import NavBar from "../../../../../components/Landing/01NavBar/NavBar";
import Footer from '../../../../../components/PanelTopDriveGroup/Footer/Footer';
import styles from './styles.module.css';

function SustainabilityPage () {

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} `}>
                <div>
                    <h1 className={`${styles.main__Title} m-0 text-center`}>Sostenibilidad</h1>
                    <h6>En <span className={styles.topDriveGroup}>Top Drive Group</span> estamos comprometidos con nuesto impacto ecológico, por eso hemos realizado diferentes proyectos en los siguientes campos:</h6>
                </div>

                <div className={`${styles.container__SustainabilityPage} mt-4 mb-4 m-auto d-flex gap-4`}>
                    <div className={`${styles.section__Sustainability} d-flex flex-column align-items-center justify-content-center`}>
                        <div>
                            <img src={"https://res.cloudinary.com/dllm2rvow/image/upload/v1713969531/Sostenibilidad_xhnkst.png"} alt="Sostenibilidad" className={styles.image__SustainabilityPage} loading="lazy" />
                        </div>
                        <div>
                            <h5 className="text-center">Nos conectan metas de sostenibilidad</h5>
                        </div>
                    </div>

                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className={`${styles.section} d-flex gap-2`}>
                            <div>
                                <img src={"https://res.cloudinary.com/dllm2rvow/image/upload/v1712787000/HuellaCarbono_xhtoxq.jpg"} alt="Huella de Carbono" className={styles.image__Sustainability} loading="lazy" />
                            </div>
                            <div className="d-flex align-items-center justify-content-center" >
                                <h6>Trabajamos conjuntamente para disminuir la huella de carbono.</h6>
                            </div>
                        </div>

                        <div className={`${styles.section} d-flex gap-2`}>
                            <div>
                                <img src={"https://res.cloudinary.com/dllm2rvow/image/upload/v1712787002/ImpactoAmbiental_t5egyh.jpg"} alt="Impacto Ambiental" className={styles.image__Sustainability} loading="lazy" />
                            </div>
                            <div className="d-flex align-items-center justify-content-center" >
                                <h6>Activamos programas para compensar el impacto ambiental de nuestra operación.</h6>
                            </div>
                        </div>

                        <div className={`${styles.section} d-flex gap-2`}>
                            <div>
                                <img src={"https://res.cloudinary.com/dllm2rvow/image/upload/v1712787006/SiembraArboles_qofbns.jpg"} alt="Siembra de Árboles" className={styles.image__Sustainability} loading="lazy" />
                            </div>
                            <div className="d-flex align-items-center justify-content-center" >
                                <h6>Realizamos jornadas de siembra de árboles en alianza con la Fundación Red de Árboles</h6>
                            </div>
                        </div>
                        
                        <div className={`${styles.section} d-flex gap-2`}>
                            <div>
                                <img src={"https://res.cloudinary.com/dllm2rvow/image/upload/v1712787004/OperacionSostenible_xgn8kx.jpg"} alt="Operación Sostenible" className={styles.image__Sustainability} loading="lazy" />
                            </div>
                            <div className="d-flex align-items-center justify-content-center" >
                                <h6>Cumplimos con los estándares exigidos por nuestros clientes en pro de garantizar una operación sostenible y eficiente.</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SustainabilityPage;