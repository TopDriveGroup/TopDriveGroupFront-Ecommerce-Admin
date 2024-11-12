/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderDetailResult, IOrderDetail } from '../../../types/orderDetail.types';

interface CustomerOrdersState {
    customerOrders: IOrderDetailResult | null;
    ordersDetail: IOrderDetail | IOrderDetail[] | null;
    customerOrdersPending: IOrderDetailResult[] | null;
    paymentsPending: IOrderDetailResult[] | null;
    loading: boolean;
    errorCustomerOrders: string[] | null;
}

const initialState: CustomerOrdersState = {
    customerOrders: null,
    ordersDetail: null,
    customerOrdersPending: null,
    paymentsPending: null,
    loading: false,
    errorCustomerOrders: null,
};

const orderSlice = createSlice({
    name: 'customerOrders',
    initialState,
    reducers: {
        setOrderData: (state) => {
            state.loading = false;
        },
        setErrorOrder: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.errorCustomerOrders= action.payload;
        },
        postGouPaymentOrderStart: (state, action: PayloadAction<IOrderDetailResult>) => {
            state.loading = true;
            state.customerOrders = action.payload;
            state.errorCustomerOrders = null;
        },
        postStatusConsultSessionServiceStart: (state, action: PayloadAction<IOrderDetailResult>) => {
            state.loading = true;
            state.customerOrders = action.payload;
            state.errorCustomerOrders = null;
        },
        getConsultTransactionIdStart: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.customerOrders = action.payload;
        },
        getOrdersHistoryStart: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.customerOrders = action.payload;
        },
        getConsultTransactionsPendingStart: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.customerOrdersPending = action.payload;
        },
        setPaymentsPendingStatusStart(state) {
            state.loading = true;
        },
        getPaymentsPendingStatusStart: (state, action: PayloadAction<IOrderDetailResult[]>) => {
            state.loading = false;
            state.paymentsPending = action.payload;
        },

        // OBTENER TODAS LAS ORDENES ACTIVAS DEL CLIENTE EN ESTADO 'En preparación' Y 'En camino'
        getAllActiveGetawayPaymentTransactionsStart: (state, action: PayloadAction<IOrderDetail>) => {
            state.loading = false;
            state.ordersDetail = action.payload;
        },
        // CAMBIAR DE ESTADO UNA ORDEN DEL CLIENTE
        patchChangeStateConfirmationStart: (state) => {
            state.loading = true;
            state.ordersDetail = null;
        },
    },
});

export const { setOrderData, setErrorOrder, postGouPaymentOrderStart, postStatusConsultSessionServiceStart, getConsultTransactionIdStart, getOrdersHistoryStart, getConsultTransactionsPendingStart, setPaymentsPendingStatusStart, getPaymentsPendingStatusStart, getAllActiveGetawayPaymentTransactionsStart, patchChangeStateConfirmationStart } = orderSlice.actions;
export default orderSlice.reducer;