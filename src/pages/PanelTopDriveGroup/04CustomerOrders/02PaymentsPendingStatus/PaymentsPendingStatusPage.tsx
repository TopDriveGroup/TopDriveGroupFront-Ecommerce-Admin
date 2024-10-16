/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
// COMPONENTES
import NavBarTopDriveGroup from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import styles from './styles.module.css';

const socket = io(import.meta.env.VITE_BASEURL_SOCKETIO);

function PaymentsPendingStatusPage() {
    const [pendingTransactions, setPendingTransactions] = useState<any[]>([]);

    useEffect(() => {
        socket.on('pendingTransactions', (data) => {
            if (Array.isArray(data.result)) setPendingTransactions(data.result);
        });

        // Cleanup para evitar fugas de memoria
        return () => {
            socket.off('pendingTransactions');
        };
    }, []);

    return (
        <div>
            <NavBarTopDriveGroup />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <h2 className={`${styles.main__Title} mb-3`}>Pagos en estado pendiente</h2>
                    <ul>
                        {Array.isArray(pendingTransactions) && pendingTransactions.length > 0 ? (
                            pendingTransactions.map((transaction, index) => (
                                <li key={index} className={styles.transaction}>
                                    <h3>Transacción {index + 1}</h3>
                                    <div><h6>Request ID:</h6> {transaction.requestId || 'No disponible'}</div>
                                    {transaction.status ? (
                                        <div>
                                            <div><h6>Estado:</h6> {transaction.status.status || 'No disponible'}</div>
                                            <div><h6>Razón:</h6> {transaction.status.reason || 'No disponible'}</div>
                                            <div><h6>Mensaje:</h6> {transaction.status.message || 'No disponible'}</div>
                                            <div><h6>Fecha de estado:</h6> {transaction.status.date ? new Date(transaction.status.date).toLocaleString() : 'No disponible'}</div>
                                        </div>
                                    ) : (
                                        <div>No hay información del estado disponible.</div>
                                    )}

                                    {/* Comprobación de existencia para el comprador */}
                                    {transaction.request?.buyer ? (
                                        <div>
                                            <div><h6>Nombre del comprador:</h6> {transaction.request.buyer.name || 'No disponible'}</div>
                                            <div><h6>Apellido del comprador:</h6> {transaction.request.buyer.surname || 'No disponible'}</div>
                                            <div><h6>Email del comprador:</h6> {transaction.request.buyer.email || 'No disponible'}</div>
                                            <div><h6>Compañía:</h6> {transaction.request.buyer.company || 'No disponible'}</div>
                                            <div><h6>Documento:</h6> {transaction.request.buyer.document || 'No disponible'}</div>
                                            <div><h6>Tipo de documento:</h6> {transaction.request.buyer.documentType || 'No disponible'}</div>
                                            <div><h6>Dirección:</h6> {transaction.request.buyer.address ? `${transaction.request.buyer.address.street}, ${transaction.request.buyer.address.city}` : 'No disponible'}</div>
                                            <div><h6>Teléfono:</h6> {transaction.request.buyer.address?.phone || 'No disponible'}</div>
                                        </div>
                                    ) : (
                                        <div>No hay información del comprador disponible.</div>
                                    )}

                                    <div><h6>IP Address:</h6> {transaction.ipAddress || 'No disponible'}</div>
                                    <div><h6>User Agent:</h6> {transaction.userAgent || 'No disponible'}</div>
                                    <div><h6>Fecha de expiración:</h6> {transaction.expiration ? new Date(transaction.expiration).toLocaleString() : 'No disponible'}</div>
                                    
                                    {transaction.payment && transaction.payment.amount && (
                                        <div>
                                            <div><h6>Referencia de pago:</h6> {transaction.payment.reference || 'No disponible'}</div>
                                            <div><h6>Descripción de pago:</h6> {transaction.payment.description || 'No disponible'}</div>
                                            <div><h6>Cantidad:</h6> {transaction.payment.amount.total} {transaction.payment.amount.currency}</div>
                                            <div><h6>Permitir pago parcial:</h6> {transaction.payment.allowPartial ? 'Sí' : 'No'}</div>
                                            <div><h6>Artículos:</h6></div>
                                            <ul>
                                                {transaction.payment.items.map((item: any, itemIndex: any) => (
                                                    <li key={itemIndex}>
                                                        {item.qty} x {item.name} ({item.category}) - Precio: {item.price} {transaction.payment.amount.currency}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li>No hay transacciones pendientes.</li>
                        )}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PaymentsPendingStatusPage;