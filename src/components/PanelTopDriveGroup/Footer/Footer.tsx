import { useTranslation } from 'react-i18next';
// ELEMENTOS DEL COMPONENTE
import TermsAndConditions from '../../../../public/TERMINOS_Y_CONDICIONES_GENERALES_DE_VENTA_TOP_DRIVE_GROUP_JUL_2024.pdf';
import PrivacyPolicy from '../../../../public/GGE-PO-006-V4_POLITICA _PRIVACIDAD_Y_TRATAMIENTO_DE_DATOS_PERSONALES.pdf';
import { FaFacebookSquare, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import styles from './styles.module.css';

function Footer() {
    const { t } = useTranslation('footer');

    return (
        <footer className={`${styles.container} d-flex align-items-center justify-content-between`}>
            <section className={`${styles.container__Component} m-auto d-flex justify-content-between`}>
                <div className={`${styles.container__Data}`}>
                    <nav className={`${styles.container__Social_Media} d-flex align-items-center justify-content-start`} aria-label="Redes Sociales">
                        <a href="https://www.facebook.com/topdrivegroup" target="blank" rel="noopener noreferrer" aria-label="Facebook" className={`${styles.link__Social_Network} d-flex align-items-center justify-content-center text-decoration-none`}>
                            <FaFacebookSquare className={`${styles.icon__Social_Media}`} />
                        </a>
                        <a href="https://www.linkedin.com/company/top-drive-group/" target="blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`${styles.link__Social_Network} d-flex align-items-center justify-content-center text-decoration-none`}>
                            <FaLinkedin className={`${styles.icon__Social_Media}`} />
                        </a>
                        <a href="https://www.instagram.com/topdrive.group/?igshid=YmMyMTA2M2Y%3D" target="blank" rel="noopener noreferrer" aria-label="Instagram" className={`${styles.link__Social_Network} d-flex align-items-center justify-content-center text-decoration-none`}>
                            <GrInstagram className={`${styles.icon__Social_Media}`} />
                        </a>
                        <a href="https://www.tiktok.com/@topdrivegroup" target="blank" rel="noopener noreferrer" aria-label="Tiktok" className={`${styles.link__Social_Network} d-flex align-items-center justify-content-center text-decoration-none`}>
                            <FaTiktok className={`${styles.icon__Social_Media}`} />
                        </a>
                        <a href="https://www.youtube.com/channel/UC-Cook_9vLLIDhfdELvvJiQ/featured" target="blank" rel="noopener noreferrer" aria-label="YouTube" className={`${styles.link__Social_Network} d-flex align-items-center justify-content-center text-decoration-none`}>
                            <FaYoutube className={`${styles.icon__Social_Media}`} />
                        </a>
                    </nav>

                    <address className={`${styles.container__Data_Company}`}>
                        <p className={`${styles.company__Address} m-0`}>{t('footer.company__Address')}</p>
                        <div className={`${styles.container__comunication} m-auto d-flex gap-2`}>
                            <span className={`${styles.means__Contact}`}>(+57) 311 271 2405</span>
                            <span> - <a href="mailto:info@topdrivegroup.com" className={`${styles.means__Contact} m-0 text-decoration-none`}>info@topdrivegroup.com</a></span>
                        </div>
                    </address>
                </div>

                <section className={`${styles.container__Polity} d-flex flex-column align-items-end justify-content-start`}>
                    <a href={TermsAndConditions} target="blank" rel="noopener noreferrer" className={`${styles.link} text-decoration-none`}>
                        {t('footer.terms__Conditions')}
                    </a>
                    <a href={PrivacyPolicy} target="blank" rel="noopener noreferrer" className={`${styles.link} text-decoration-none`}>
                        {t('footer.privacy__Policy')}
                    </a>
                    <p className="m-0">© Copyright 2024 Top Drive Group</p>
                    <p className="m-0">{t('footer.all__Rights_Reserved')}</p>
                </section>
            </section>
        </footer>
    );
}

export default Footer;