/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IGouOrderRequest } from '../../../types/gouOrder.types';
import { setErrorOrder, postGouPaymentOrderStart, getConsultTransactionIdStart, getOrdersHistoryStart, getConsultTransactionsPendingStart, setPaymentsPendingStatusStart, getPaymentsPendingStatusStart } from './customerOrdersSlice';

//CREA UNA SESION DE PAGO PARA LA ORDEN
export const postGouPaymentOrder = (formData: IGouOrderRequest, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.post('/gou-web-checkout/auth', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(postGouPaymentOrderStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorOrder(error.response?.data.message));
        } else {
            dispatch(setErrorOrder(error.message));
        }
    }
};

//CONSULTAR EL ESTADO DE UNA TRANSACCION HECHA EN GOU
export const getConsultTransactionId = (transactionId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/gou-web-checkout/auth/${transactionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getConsultTransactionIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorOrder(error.response?.data.message));
        } else {
            dispatch(setErrorOrder(error.message));
        }
    }
};

//OBTENER TODO EL HISTORIAL DE ORDENES
export const getOrdersHistory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/gou-web-checkout/all-transactions`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getOrdersHistoryStart(response.data.result));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorOrder(error.response?.data.message));
        } else {
            dispatch(setErrorOrder(error.message));
        }
    }
};

//CONSULTAR TRANSACCIONES PENDIENTES PARA AVISARLE AL CLIENTE Y EVITAR DOBLE PAGO
export const getConsultTransactionsPending = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/gou-web-checkout/consult-transactions-pending`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getConsultTransactionsPendingStart(response.data.result));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorOrder([error.response?.data.message]));
        } else {
            dispatch(setErrorOrder([error.message]));
        }
    }
};

//CONTULTA TODAS LAS ORDENES EN ESTADO PENDIENTE
export const getPaymentsPendingStatus = (token: string) => async (dispatch: AppDispatch) => {
    dispatch(setPaymentsPendingStatusStart()); // Indicar que la carga ha comenzado
    try {
        const response = await axiosInstance.get(`/gou-web-checkout/cron-pending-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        dispatch(getPaymentsPendingStatusStart(response.data.result));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorOrder([error.response?.data.message]));
        } else {
            dispatch(setErrorOrder([error.message]));
        }
    }
};