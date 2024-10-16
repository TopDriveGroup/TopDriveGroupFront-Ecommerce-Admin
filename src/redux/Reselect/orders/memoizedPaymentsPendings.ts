import { createSelector } from 'reselect';
import { RootState } from '../../store';

// SELECTORES PARA "paymentsPending"
const selectPaymentsPending = (state: RootState) => state.orders.paymentsPending;
const selectLoading = (state: RootState) => state.orders.loading;

// SELECTOR MEMOIZADO PARA "paymentsPending"
export const memoizedPaymentsPending = createSelector(
  [selectPaymentsPending],
  (paymentsPending) => paymentsPending ? [...paymentsPending] : []  // Crea una nueva referencia
);

// SELECTOR MEMOIZADO PARA "loading"
export const memoizedLoading = createSelector(
  [selectLoading],
  (loading) => !!loading  // Transforma a booleano
);