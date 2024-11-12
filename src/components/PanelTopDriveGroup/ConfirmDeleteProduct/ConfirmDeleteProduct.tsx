import jsCookie from 'js-cookie';
//REDUX
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import { deleteProduct, getProducts } from '../../../redux/PanelTopDriveGroup/02Product/actions';
import styles from './styles.module.css';

interface ConfirmDeleteProductProps {
    idProduct: string;
    onCloseModal: () => void;
}

function ConfirmDeleteProduct({ idProduct, onCloseModal }: ConfirmDeleteProductProps) {
    const token = jsCookie.get("token") || '';
    const dispatch: AppDispatch = useDispatch();

    const onDelete = async () => {
        try {
            await dispatch(deleteProduct(idProduct, token));
            onCloseModal();
            dispatch(getProducts(token));
        } catch (error) {
            throw new Error('Error al eliminar el producto');
        }
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <p>¿Estas seguro de eliminar este producto?</p>
            <div>
                <button onClick={onDelete} className={`${styles.button__Delete} pt-2 pb-2 px-4 border-0`}>Aceptar</button>
            </div>
        </div>
    );
}

export default ConfirmDeleteProduct;