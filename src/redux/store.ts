import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './Auth/authSlice';
import documentRequestReducer from './PanelTopDriveGroup/08DocumentRequest/documentRequestSlice';
import productReducer from './PanelTopDriveGroup/02Product/productSlice';
import { socketMiddleware } from './Socket.io/socketMiddleware';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        documentRequest: documentRequestReducer,
        products: productReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false }).concat(socketMiddleware),
});

export type AppDispatch = typeof store.dispatch;