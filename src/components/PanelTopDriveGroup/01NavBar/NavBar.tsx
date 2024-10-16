/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { logoutUser } from '../../../redux/Auth/actions';
//ELEMENTOS DEL COMPONENTE
import LogoTopDrive from '../../../assets/TopDriveGroup/LogoTopDrive.svg';
import { IoClose } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import styles from './styles.module.css';

function NavBar() {
    const location = useLocation();
    const { t, i18n } = useTranslation('navBar');
    const dispatch: AppDispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const languageMenuRef = useRef<HTMLDivElement>(null);
    const [languageMenuVisible, setLanguageMenuVisible] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const toggleLanguageMenu = () => {
        setLanguageMenuVisible(!languageMenuVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
                setLanguageMenuVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, languageMenuRef]);

    const handleLanguageChange = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
        setLanguageMenuVisible(false);
    };

    const logout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${styles.container} position-fixed top-0`}>
            <div className={`${styles.container__Pre_NavBar} m-auto`}>
                <div className={`${styles.pre__NavBar} d-flex align-items-center justify-content-between`}>
                    <div className={`${styles.container__Language_Phone_Lines} d-flex align-items-center justify-content-between`}>
                        <div className={`${styles.container__Language} px-2 d-flex align-items-center justify-content-center position-relative`} onClick={toggleLanguageMenu}>
                            <div className={`${styles.container__Icon_Language} d-flex align-items-center justify-content-center text-center overflow-hidden`} >
                                <BiWorld />
                            </div>
                            <div className={`${styles.text__Language} mx-1 p-0`}>
                                {t('navBar.language')}
                            </div>
                            {languageMenuVisible && (
                                <div ref={languageMenuRef} className={`${styles.dropdown__Language} p-3 d-flex flex-column position-absolute overflow-hidden`}>
                                    <div onClick={() => handleLanguageChange('en')} className={`${styles.language__Button} ${i18n.language === 'en' ? styles.language__Selected : ''} `}>English</div>
                                    <div onClick={() => handleLanguageChange('es')} className={`${styles.language__Button} ${i18n.language === 'es' ? styles.language__Selected : ''} `}>Español</div>
                                </div>
                            )}
                        </div>

                        <Link to="https://test.topdrivegroup.com" target="blank" rel="noopener noreferrer" className={`${styles.home} p-3 d-flex align-items-center justify-content-center text-decoration-none`} >
                            Inicio
                        </Link>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/ecommerce" className={`${styles.container__Logo} d-flex align-items-center justify-content-center`} >
                        <img src={LogoTopDrive} alt="Logo Top Drive Group" className={`${styles.logo} m-auto`} loading="lazy"  />
                    </Link>

                    {showModal && (
                        <div className={`${styles.container__Modal} position-absolute top-0`} >
                            <div className={styles.modal}>
                                <div className={`${styles.container__Logo_Close} p-2 d-flex align-items-center justify-content-between`}>
                                    <div className={`${styles.container__Logo} d-flex align-items-center justify-content-center`}>
                                        <img src={LogoTopDrive} alt="Logo Top Drive Group" className={`${styles.logo} m-auto`} loading="lazy" />
                                    </div>
                                    <div onClick={closeModal}><IoClose className={styles.icon__Close_Modal} /></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={`${styles.links__Nemu_Interactions} d-flex`}>
                        <Link to="/panel-top-drive-group/configuration/user-management" className={`${styles.panel} ${location.pathname === '/panel-top-drive-group/configuration' ? styles.active : ''} d-flex align-items-center justify-content-end text-center text-decoration-none gap-1`} >
                            <AiOutlineUser className={styles.icon__User_Panel} />
                            {t('navBar.panel')}
                        </Link>
                        <div className={`${styles.logout} px-2 d-flex align-items-center justify-content-end text-center text-decoration-none gap-1`} onClick={logout} >
                            {t('navBar.exit')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;