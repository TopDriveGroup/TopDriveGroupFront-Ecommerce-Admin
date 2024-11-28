/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import jsCookie from 'js-cookie';
import { Modal } from 'react-bootstrap';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { getAllActiveGetawayPaymentTransactions } from '../../../../redux/PanelTopDriveGroup/04CustomerOrders/actions';
// ELEMENTOS DEL COMPONENTE
import { IOrderDetail } from '../../../../types/orderDetail.types';
import NavBar from '../../../../components/PanelTopDriveGroup/01NavBar/NavBar';
import SideBar from '../../../../components/PanelTopDriveGroup/SideBar/SideBar';
import Footer from '../../../../components/PanelTopDriveGroup/Footer/Footer';
import ModalChangeStateConfirmation from '../../../../components/PanelTopDriveGroup/04CustomerOrders/ModalChangeStateConfirmation/ModalChangeStateConfirmation';
import ModalSeeOrderDetail from '../../../../components/PanelTopDriveGroup/04CustomerOrders/ModalSeeOrderDetail/ModalSeeOrderDetail';
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsPencil } from 'react-icons/bs';
import styles from './styles.module.css';

function ActiveCustomerOrdersPage() {
    const token = jsCookie.get("token");

    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const ordersDetail = useSelector((state: RootState) => state.customerOrders.ordersDetail);

    useEffect(() => {
        if (token) {
            dispatch(getAllActiveGetawayPaymentTransactions(token));
        }
    }, [token]);
    
    // Estado para las órdenes filtradas
    const [filteredOrders, setFilteredOrders] = useState<IOrderDetail[]>([]);
    useEffect(() => {
        if (ordersDetail) {
            setFilteredOrders(ordersDetail as IOrderDetail[]);
        }
    }, [ordersDetail]);
    
    const [description, setDescription] = useState('');
    function handleInputChange(e: { target: { value: string } }) {
        const newDescription = e.target.value;
        setDescription(newDescription);
    }
    
    // ACTUALIZA O REFRESCA LAS ORDENES
    const [ loadingOrders, setLoadingOrders ] = useState(false);
    const handleUpdate = async () => {
        setLoadingOrders(true);
        if (token) {
            await dispatch(getAllActiveGetawayPaymentTransactions(token));
        }
        setLoadingOrders(false);
    };

    // COPIA EL "reference"
    const [copyReference, setCopyReference] = useState<{ [key: string]: boolean }>({});
    const handleCopyReference = async (id: string, link: string) => {
        try {
            await navigator.clipboard.writeText(link);
            setCopyReference(prevState => ({
                ...prevState,
                [id]: true
            }));
            setTimeout(() => {
                setCopyReference(prevState => ({
                    ...prevState,
                    [id]: false
                }));
            }, 3000);
        } catch (err) {
            throw new Error('Error al copiar el enlace');
        }
    };

    // COPIA EL "document"
    const [copyDocumentId, setCopyDocumentId] = useState<{ [key: string]: boolean }>({});
    const handleCopyDocumentId = async (id: string, link: string) => {
        try {
            await navigator.clipboard.writeText(link);
            setCopyDocumentId(prevState => ({
                ...prevState,
                [id]: true
            }));
            setTimeout(() => {
                setCopyDocumentId(prevState => ({
                    ...prevState,
                    [id]: false
                }));
            }, 3000);
        } catch (err) {
            throw new Error('Error al copiar el enlace');
        }
    };

    // MODALES
    const [idOrder, setIdOrder] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<IOrderDetail>();
    const [showSeeOrderDetailModal, setShowSeeOrderDetailModal] = useState(false);

    // MODAL PARA VER LOS DETALLES DE LA ORDEN
    const handleSeeOrderDetail = useCallback((order: IOrderDetail) => {
        setSelectedOrder(order);
        setShowSeeOrderDetailModal(true);
    }, []);

    // MODAL QUE CAMBIA DE ESTADO LA ORDEN
    const [showChangeStateConfirmation, setShowChangeStateConfirmation] = useState(false);
    const handleChangeStateConfirmation = () => {
        setShowChangeStateConfirmation(true);
    };

    // EVENTO PARA CERRAR LOS MODALES
    const onCloseModal = () => {
        setShowChangeStateConfirmation(false);
    };

    // FILTRA LAS ORDENES POR "reference"
    const handleFilterByReferenceAndIDDocument = () => {
        // SI EL INPUT DE BUSQUEDA ES "", NO FILTRA
        if (description.trim() === "") {
            setFilteredOrders(Array.isArray(ordersDetail) ? ordersDetail : []);
            return;
        }

        // FILTRA SI HAY "reference" O "document"
        if (Array.isArray(ordersDetail)) {
            const filtered = ordersDetail.filter((order: IOrderDetail) => 
                order.deliveryNoteNumber === description || 
                order.buyer.document === description
            );
            setFilteredOrders(filtered);
        } else console.log("ordersDetail no es un array");
    };

    // RESETEA EL FILTRADO DE ORDENES
    const resetFilter = () => {
        setFilteredOrders(ordersDetail as IOrderDetail[]);
        setDescription('');
    };

    return (
        <div>
            <NavBar />
            <div className={`${styles.container} d-flex align-items-start justify-content-center`}>
                <SideBar />
                <div className={`${styles.container__Component} p-4`}>
                    <div className='d-flex align-items-center justify-content-between w-100'>
                        <h2 className={`${styles.main__Title} mb-3`}><IoCartOutline className={styles.icon}/> Estos son los pedidos</h2>
                        <div className={`${styles.container__Search} d-flex align-items-center justify-content-between gap-2`}>
                            <div className={`${styles.search} d-flex align-items-center justify-content-center position-relative gap-2`}>
                                <span>Buscar</span>
                                <input
                                    type="text"
                                    id="search-input"
                                    className={`${styles.input__Search} pt-1 pb-1 px-2 border rounded`}
                                    placeholder='Busca por referencia o número de ID'
                                    onChange={handleInputChange}
                                    value={description}
                                    aria-label='Busca por referencia o número de ID'
                                />
                                <button
                                    type="submit"
                                    className={`${styles.button__Search} d-flex align-items-center justify-content-center position-absolute border-0`}
                                    onClick={handleFilterByReferenceAndIDDocument}
                                    aria-label='Busca por referencia o número de ID'
                                >
                                    <IoIosSearch className={`${styles.icon__Search} `} />
                                </button>
                            </div>

                            <button
                                type="submit"
                                className={`${styles.button__Reset} px-2 d-flex align-items-center justify-content-center rounded`}
                                onClick={resetFilter}
                                aria-label='Borrar filtros'
                            >
                                Borrar filtros
                            </button>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-end">
                        {loadingOrders ?
                            <button className={`${styles.button__Update_Orders} px-3 border-0 rounded`} type='button'>
                                <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Actualizando...
                            </button>
                        :
                            <button
                                className={`${styles.button__Update_Orders} px-3 border-0 rounded`}
                                type='button'
                                onClick={handleUpdate}
                            >
                                Actualizar órdenes
                            </button>
                        }
                    </div>

                    <div className={`${styles.container__Table} mt-2 mb-2 mx-auto`}>
                        <table className="table">
                            <thead className={`${styles.container__Head}`}>
                                <tr className={`${styles.container__Tr} d-flex align-items-center justify-content-between`}>
                                    <th className={`${styles.date__Order} d-flex align-items-center justify-content-center text-center`}>Fecha</th>
                                    <th className={`${styles.delivery__Note_Number} d-flex align-items-center justify-content-center text-center`}>Orden de venta</th>
                                    <th className={`${styles.id__Gou} d-flex align-items-center justify-content-center text-center`}>ID GOU</th>
                                    <th className={`${styles.client} d-flex align-items-center justify-content-center text-center`}>Cliente</th>
                                    <th className={`${styles.id__Client} d-flex align-items-center justify-content-center text-center`}>Identificación</th>
                                    <th className={`${styles.status} d-flex align-items-center justify-content-center text-center`}>Estado del pago</th>
                                    <th className={`${styles.state} d-flex align-items-center justify-content-center text-center`}>Estado del pedido</th>
                                    <th className={`${styles.total} d-flex align-items-center justify-content-center text-center`}>Total</th>
                                    <th className={`${styles.actions} d-flex align-items-center justify-content-center text-center`}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className={`${styles.container__Body}`}>
                                {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                    <tr key={order._id} className={`${styles.container__Info} d-flex align-items-center justify-content-between`}>
                                        <td className={`${styles.date__Order} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Fecha no disponible'}</span>
                                        </td>
                                        <td className={`${styles.delivery__Note_Number} pt-0 pb-0 px-2 d-flex align-items-center justify-content-between`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.deliveryNoteNumber}</span>
                                            <div className={`${styles.container__Icon_Copy} d-flex align-items-center justify-content-center position-relative`}
                                                onClick={() => {
                                                    if (order.deliveryNoteNumber) {
                                                        handleCopyReference(order._id ?? '', order.deliveryNoteNumber);
                                                    }
                                                }}
                                            >
                                                <FaRegCopy className={styles.icon__Copy}/>
                                                {order._id && copyReference[order._id] && (
                                                    <div className={`${styles.message__Copy} d-flex align-items-center justify-content-center position-absolute`}>
                                                        <span className='m-0'>Referencia copiada</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className={`${styles.id__Gou} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.requestId}</span>
                                        </td>
                                        <td className={`${styles.client} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.buyer?.name || 'N/A'} {order.buyer?.surname || ''}</span>
                                        </td>
                                        <td className={`${styles.id__Client} pt-0 pb-0 px-2 d-flex align-items-center justify-content-between`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.buyer?.document}</span>
                                            <div className={`${styles.container__Icon_Copy} d-flex align-items-center justify-content-center position-relative`}
                                                onClick={() => {
                                                    if (order.buyer.document) {
                                                        handleCopyDocumentId(order._id ?? '', order.buyer.document);
                                                    }
                                                }}
                                            >
                                                <FaRegCopy className={styles.icon__Copy}/>
                                                {order._id && copyDocumentId[order._id] && (
                                                    <div className={`${styles.message__Copy} d-flex align-items-center justify-content-center position-absolute`}>
                                                        <span className='m-0'>Número de ID copiado</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className={`${styles.status} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.status === 'Approved' ? 'Aprobada' : ''}</span>
                                        </td>
                                        <td className={`${styles.state} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.state}</span>
                                        </td>
                                        <td className={`${styles.total} pt-0 pb-0 px-2 d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <span className={`${styles.text__Ellipsis} overflow-hidden`}>{order.payment?.amount?.total?.toLocaleString('es-CO', { style: 'currency', currency: order.payment?.amount?.currency || 'COP'}) || 'Total no disponible'}</span>
                                        </td>
                                        <td className={`${styles.actions} d-flex align-items-center justify-content-center overflow-hidden`}>
                                            <div className={`d-flex align-items-center justify-content-center overflow-hidden gap-2`}>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <MdOutlineRemoveRedEye
                                                        className={`${styles.button__Action} `}
                                                        onClick={() => {
                                                            setIdOrder(order._id ?? '');
                                                            handleSeeOrderDetail(order);
                                                        }}
                                                    />
                                                </div>
                                                <div className={`${styles.container__Icons} d-flex align-items-center justify-content-center overflow-hidden`}>
                                                    <BsPencil
                                                        className={`${styles.button__Action} d-flex align-items-center justify-content-center`}
                                                        onClick={() => {
                                                            setIdOrder(order._id ?? '');
                                                            handleChangeStateConfirmation()
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8}>No se encontraron órdenes.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal show={showSeeOrderDetailModal} onHide={onCloseModal} size="xl" backdrop="static" keyboard={false} >
                    <Modal.Header closeButton onClick={() => setShowSeeOrderDetailModal(false)}>
                        <Modal.Title className='text-primary-emphasis text-start'>Detalles de la orden</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedOrder &&
                            <ModalSeeOrderDetail
                                selectedOrder={selectedOrder}
                            />
                        }
                    </Modal.Body>
                </Modal>

                <Modal show={showChangeStateConfirmation} onHide={() => setShowChangeStateConfirmation(false)} backdrop="static" keyboard={false} >
                    <Modal.Header closeButton onClick={() => setShowChangeStateConfirmation(false)}>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalChangeStateConfirmation
                            idOrder={idOrder}
                            onCloseModal={() => {onCloseModal()}}
                        />
                    </Modal.Body>
                </Modal>
            </div>
            <Footer />
        </div>
    );
}

export default ActiveCustomerOrdersPage;