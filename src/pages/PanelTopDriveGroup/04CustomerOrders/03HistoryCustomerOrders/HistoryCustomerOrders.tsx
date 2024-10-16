/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import jsCookie from 'js-cookie';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getOrdersHistory } from '../../../../redux/PanelTopDriveGroup/04CustomerOrders/actions';
// ELEMENTOS DEL COMPONENTE
import NavBar from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import styles from './styles.module.css';

function HistoryCustomerOrdersPage() {
    const token = jsCookie.get("token");

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const customerOrders = useSelector((state: RootState) => state.customerOrders.customerOrders);

    useEffect(() => {
        if (token) {
            dispatch(getOrdersHistory(token));
        }
    }, [token]);

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Pedidos históricos</h2>
                    {Array.isArray(customerOrders) && customerOrders.length > 0 ? (
                        customerOrders.map((order) => (
                            <div key={order.requestId} className={styles.orderCard}>
                                <h3>Orden ID: {order.requestId}</h3>
                                <p>Status: {order.status?.status} - {order.status?.message}</p>
                                <p>Fecha: {order.status?.date ? new Date(order.status.date).toLocaleString() : 'Fecha no disponible'}</p>
                                
                                <h4>Detalles del Comprador:</h4>
                                <p>Nombre: {order.request?.buyer?.name} {order.request?.buyer?.surname}</p>
                                <p>Email: {order.request?.buyer?.email}</p>
                                <p>Dirección: {order.request?.buyer?.address?.street}, {order.request?.buyer?.address?.city}</p>

                                <h4>Detalles del Pago:</h4>
                                <p>Método de Pago: {order.payment?.paymentMethodName ?? 'Método no disponible'}</p>
                                <p>Total: {order.payment?.amount?.total ?? 'Total no disponible'} {order.payment?.amount?.currency ?? ''}</p>

                                <h4>Artículos:</h4>
                                <ul>
                                    {order.request?.payment?.items?.map((item: any) => (
                                        <li key={item.sku}>
                                            {item.sku} - {item.name} - {item.qty} und x {item.price} {order.request?.payment?.amount?.currency} c/u
                                        </li>
                                    )) ?? <p>No hay artículos disponibles.</p>}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No hay órdenes disponibles.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HistoryCustomerOrdersPage;