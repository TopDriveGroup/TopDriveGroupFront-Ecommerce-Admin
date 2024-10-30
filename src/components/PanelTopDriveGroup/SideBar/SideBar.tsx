/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import jsCookie from 'js-cookie';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { getProfileUser, logoutUser } from '../../../redux/Auth/actions';
//ELEMENTOS DEL COMPONENTE
import { IUserPlatform } from '../../../types/userPlatform.types';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from './styles.module.css';

function SideBar() {
    const token = jsCookie.get("token") || '';
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.authUser.authUser);

    useEffect(() => {
        if (token) dispatch(getProfileUser(token));
    }, [token]);

    const [userPlatform, setUserPlatform] = useState<IUserPlatform>();
    useEffect(() => {
        if (authUser) {
            setUserPlatform(authUser as IUserPlatform);
        }
    }, [authUser]);

    // Leer el estado inicial de los submenús desde localStorage
    const getInitialState = (key: string, defaultValue: boolean) => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    };

    const [isConfigurationSubMenuOpen, setConfigurationSubMenuOpen] = useState(() => getInitialState('configurationSubMenuOpen', false));
    const [isProductsSubMenuOpen, setProductsSubMenuOpen] = useState(() => getInitialState('productsSubMenuOpen', false));
    const [isQuotesClientsSubMenuOpen, setQuotesClientsSubMenuOpen] = useState(() => getInitialState('quotesClientsSubMenuOpen', false));
    const [isCustomerOrdersSubMenuOpen, setCustomerOrdersSubMenuOpen] = useState(() => getInitialState('customerOrdersSubMenuOpen', false));
    const [isClientsSubMenuOpen, setClientsSubMenuOpen] = useState(() => getInitialState('clientsSubMenuOpen', false));

    // SUBMENU DE CONFIGURACION
    const toggleConfigurationSubMenuOpen = () => {
        const newState = !isConfigurationSubMenuOpen;
        setConfigurationSubMenuOpen(newState);
        localStorage.setItem('configurationSubMenuOpen', JSON.stringify(newState));
    };

    // SUBMENU DE PRODUCTOS
    const toggleProductsSubMenuOpen = () => {
        const newState = !isProductsSubMenuOpen;
        setProductsSubMenuOpen(newState);
        localStorage.setItem('productsSubMenuOpen', JSON.stringify(newState));
    };

    // SUBMENU DE COTIZACIONES
    const toggleQuotesClientsSubMenuOpen = () => {
        const newState = !isQuotesClientsSubMenuOpen;
        setQuotesClientsSubMenuOpen(newState);
        localStorage.setItem('quotesClientsSubMenuOpen', JSON.stringify(newState));
    };

    // SUBMENU DE PEDIDOS DE CLIENTES
    const toggleCustomerOrdersSubMenuOpen = () => {
        const newState = !isCustomerOrdersSubMenuOpen;
        setCustomerOrdersSubMenuOpen(newState);
        localStorage.setItem('customerOrdersSubMenuOpen', JSON.stringify(newState));
    };

    // SUBMENU DE CLIENTES
    const toggleClientsSubMenuOpen = () => {
        const newState = !isClientsSubMenuOpen;
        setClientsSubMenuOpen(newState);
        localStorage.setItem('clientsSubMenuOpen', JSON.stringify(newState));
    };

    // RUTAS CON PARAMS
    const matchConfiguration = useMatch('/panel-top-drive-group/configuration/');
    const matchProduct = useMatch('/panel-top-drive-group/products/edit-product/:idProduct');
    const matchQuotesClients = useMatch('/panel-top-drive-group/quotes-clients');
    const matchCustomerOrders = useMatch('/panel-top-drive-group/active-customer-orders/');
    const matchClients = useMatch('/panel-top-drive-group/clients/');

    const logout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            throw new Error('Error al hacer el cierre de sesión');
        }
    };

    return (
        <div className={`${styles.container} overflow-y-auto`}>
            <div className={`${styles.container__Panel_User} d-flex flex-column`}>
                <div className={`${styles.container__Data_User} mb-3 p-1 px-2`}>
                    Hola {userPlatform?.name}!
                </div>
                <div onClick={toggleConfigurationSubMenuOpen} className={`${styles.link__Section_Panel} ${(location.pathname === '/panel-top-drive-group/configuration/user-management'  || matchConfiguration) ? styles.active : ''} d-flex align-items-center justify-content-between text-decoration-none`}>
                    Configuración {isConfigurationSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  
                </div>
                {isConfigurationSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link
                            to='/panel-top-drive-group/configuration/user-management'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/configuration/user-management' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Gestión de usuarios
                        </Link>
                    </div>
                )}

                <div onClick={toggleProductsSubMenuOpen} className={`${styles.link__Section_Panel} ${(location.pathname === '/panel-top-drive-group/products/consult' || location.pathname === '/panel-top-drive-group/products/create-product' || location.pathname === '/panel-top-drive-group/products/create-many-products' || matchProduct) ? styles.active : ''}  d-flex align-items-center justify-content-between text-decoration-none`}>
                    Productos {isProductsSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  
                </div>
                {isProductsSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link
                            to='/panel-top-drive-group/products/consult'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/products/consult' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Todos los productos
                        </Link>
                        <Link
                            to='/panel-top-drive-group/products/consult-sap'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/products/consult-sap' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Productos de SAP
                        </Link>
                        <Link
                            to='/panel-top-drive-group/products/create-product'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/products/create-product' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Crear productos
                        </Link>
                        <Link
                            to='/panel-top-drive-group/products/create-many-products'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/products/create-many-products' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Crear masivamente productos
                        </Link>
                    </div>
                )}

                <div onClick={toggleQuotesClientsSubMenuOpen} className={`${styles.link__Section_Panel} ${(location.pathname === '/panel-top-drive-group/quotes-clients/active-customer-quotations' || location.pathname === '/panel-top-drive-group/quotes-clients/history-customer-quotations' || matchQuotesClients) ? styles.active : ''}  d-flex align-items-center justify-content-between text-decoration-none`}>
                    Cotizaciones de clientes {isQuotesClientsSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  
                </div>
                {isQuotesClientsSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link
                            to='/panel-top-drive-group/quotes-clients/active-customer-quotations'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/quotes-clients/active-customer-quotations' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Cotizaciones activas
                        </Link>
                        <Link
                            to='/panel-top-drive-group/quotes-clients/history-customer-quotations'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/quotes-clients/history-customer-quotations' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Cotizaciones históricas
                        </Link>
                    </div>
                )}

                <div onClick={toggleCustomerOrdersSubMenuOpen} className={`${styles.link__Section_Panel} ${(location.pathname === '/panel-top-drive-group/customer-orders/active-customer-orders' || location.pathname === '/panel-top-drive-group/customer-orders/history-customer-orders' || matchCustomerOrders) ? styles.active : ''}  d-flex align-items-center justify-content-between text-decoration-none`}>
                    Pedidos de clientes {isCustomerOrdersSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  
                </div>
                {isCustomerOrdersSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link
                            to='/panel-top-drive-group/customer-orders/active-customer-orders'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/customer-orders/active-customer-orders' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Pedidos activos
                        </Link>
                        <Link
                            to='/panel-top-drive-group/customer-orders/payments-pending-status'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/customer-orders/payments-pending-status' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Pagos en estado pendiente
                        </Link>
                        <Link
                            to='/panel-top-drive-group/customer-orders/history-customer-orders'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/customer-orders/history-customer-orders' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Pedidos históricos
                        </Link>
                    </div>
                )}

                <div onClick={toggleClientsSubMenuOpen} className={`${styles.link__Section_Panel} ${(location.pathname === '/panel-top-drive-group/customers/all-customers' || matchClients) ? styles.active : ''} d-flex align-items-center justify-content-between text-decoration-none`}>
                    Clientes {isClientsSubMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}  
                </div>
                {isClientsSubMenuOpen && (
                    <div className={styles.sub__Menu}>
                        <Link
                            to='/panel-top-drive-group/customers/all-customers'
                            className={`${styles.link__Sub_Menu} ${location.pathname === '/panel-top-drive-group/customers/all-customers' ? styles.active__Sub_Menu : ''} text-decoration-none`}
                        >
                            Todos los clientes
                        </Link>
                    </div>
                )}
                <Link
                    to='/panel-top-drive-group/document-request'
                    className={`${styles.link__Section_Panel} ${location.pathname === '/panel-top-drive-group/document-request' ? styles.active : ''} text-decoration-none`}
                >
                    Solicitud de documentos
                </Link>
                <Link
                    to='/panel-top-drive-group/electronic-invoices'
                    className={`${styles.link__Section_Panel} ${location.pathname === '/panel-top-drive-group/electronic-invoices' ? styles.active : ''} text-decoration-none`}
                >
                    Facturas electrónicas
                </Link>
                <div className={styles.logout} onClick={logout}>
                    Cerrar sesión
                </div>
            </div>
        </div>
    );
}

export default SideBar;