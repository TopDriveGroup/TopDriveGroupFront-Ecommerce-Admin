import { IOrderDetail } from '../../../../types/orderDetail.types';
import styles from './styles.module.css';

interface ModalSeeOrderDetailProps {
    selectedOrder: IOrderDetail;
}

function ModalSeeOrderDetail({selectedOrder}: ModalSeeOrderDetailProps) {
    console.log('selectedOrder: ', selectedOrder)

    return (
        <div className="p-2 position-relative">
            <h3 className={`${styles.title__Modal} mb-4 text-start`}>Detalles de la orden</h3>

        </div>
    );
}

export default ModalSeeOrderDetail;