/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
import { useState, SetStateAction } from 'react';
import jsCookie from 'js-cookie';
import { useForm } from 'react-hook-form';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../redux/store';
import { patchChangeStateConfirmation, getAllActiveGetawayPaymentTransactions } from '../../../../redux/PanelTopDriveGroup/04CustomerOrders/actions';
// ELEMENTOS DEL COMPONENTE
import { IOrderDetail } from '../../../../types/orderDetail.types';
import styles from './styles.module.css';

interface ModalChangeStateConfirmationProps {
    idOrder: string;
    onCloseModal: () => void;
}

function ModalChangeStateConfirmation({idOrder, onCloseModal}: ModalChangeStateConfirmationProps) {
    const token = jsCookie.get("token") || '';

    const dispatch: AppDispatch = useDispatch();
    const errorCustomerOrders = useSelector((state: RootState) => state.customerOrders.errorCustomerOrders);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IOrderDetail>();
    const [ loading, setLoading ] = useState(false);
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const [newState, setNewState] = useState('En camino');
    const handleNewState = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNewState(event.target.value);
    };

    const onSubmit = async (values: IOrderDetail) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                state: newState,
            } as IOrderDetail;
            await new Promise(resolve => setTimeout(resolve, 500));
            await dispatch(patchChangeStateConfirmation(idOrder, formData, token));
            setFormSubmitted(true);    
            reset();
            setTimeout(() => {
                dispatch(getAllActiveGetawayPaymentTransactions(token));
                setFormSubmitted(false);
                setTimeout(() => {
                    onCloseModal();
                }, 10);
            }, 1500);
        } catch (error) {
            throw new Error('Error al cambiar de estado la orden');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2 position-relative">
            <h3 className={`${styles.title__Modal} mb-4 text-start`}>Cambio de estado</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} position-relative`} >
                <div className="mb-4 w-100 position-relative">
                    <h6 className={styles.label}>Nuevo estado</h6>
                    <select
                        defaultValue={0}
                        className={`${styles.input} p-2 border`}
                        {...register('state', { required: true})}
                        onChange={handleNewState}
                    >
                        <option value='En camino'>En camino</option>
                        <option value='Entregado'>Entregado</option>
                    </select>
                    {errors.state && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El nombre de la mercancía es requerido</p>
                    )}
                </div>

                <div className="mb-4 w-100 position-relative">
                    <h6 className={styles.label}>Número de orden de la transportadora</h6>
                    <input
                        type="text"
                        className={`${styles.input} p-2 border`}
                        placeholder='Tu número de teléfono'
                        {...register('conveyorShippingOrderNumber', { required: true })}
                    />
                    {errors.conveyorShippingOrderNumber && (
                        <p className={`${styles.text__Danger} text-danger position-absolute`}>El número de ordend de envío es requerido</p>
                    )}
                </div>

                <div className="mb-4 w-100 position-relative">
                    <h6 className={styles.label}>Comentarios de envío</h6>
                    <textarea
                        className={`${styles.input} p-2 border`}
                        placeholder={`Deja acá tus comentarios`}
                        {...register('commentConveyorShippingOrderNumber', { required: true })}
                        cols={10}
                        rows={5}
                    />
                    {errors.commentConveyorShippingOrderNumber && (
                        <p className={`${styles.text__Danger_Textarea} text-danger position-absolute`}>Los comentarios son requeridos</p>
                    )}
                </div>

                {Array.isArray(errorCustomerOrders) && errorCustomerOrders.map((error, i) => (
                    <div key={i} className={`${styles.alert__Danger} text-center position-absolute alert-danger`}>{error}</div>
                ))}

                {formSubmitted && (
                    <div className={`${styles.alert__Success} text-center position-absolute alert-success`}>El formulario se ha enviado con éxito</div>
                )}
  
                <div className="d-flex">
                    {loading ? 
                        <div className={`${styles.container__Loading} d-flex align-items-center justify-content-center`}>
                            <button className={`${styles.button__Submit} border-0 rounded m-auto`} type='submit' >
                                <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Guardando...
                            </button>
                        </div> 
                    :
                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Enviar</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default ModalChangeStateConfirmation;