/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGouOrderResult } from '../../../types/gouOrder.types';

interface CustomerOrdersState {
    customerOrders: IGouOrderResult | null;
    customerOrdersPending: IGouOrderResult[] | null;
    paymentsPending: IGouOrderResult[] | null;
    loading: boolean;
    errorCustomerOrders: string[] | null;
}

const initialState: CustomerOrdersState = {
    customerOrders: null,
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
        postGouPaymentOrderStart: (state, action: PayloadAction<IGouOrderResult>) => {
            state.loading = true;
            state.customerOrders = action.payload;
            state.errorCustomerOrders = null;
        },
        postStatusConsultSessionServiceStart: (state, action: PayloadAction<IGouOrderResult>) => {
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
        getPaymentsPendingStatusStart: (state, action: PayloadAction<IGouOrderResult[]>) => {
            state.loading = false;
            state.paymentsPending = action.payload;
        },
    },
});

export const { setOrderData, setErrorOrder, postGouPaymentOrderStart, postStatusConsultSessionServiceStart, getConsultTransactionIdStart, getOrdersHistoryStart, getConsultTransactionsPendingStart, setPaymentsPendingStatusStart, getPaymentsPendingStatusStart } = orderSlice.actions;
export default orderSlice.reducer;