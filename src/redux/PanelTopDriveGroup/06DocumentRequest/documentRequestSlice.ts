/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDocumentRequest } from '../../../types/documentRequest.types';

interface DocumentRequestState {
    documentRequest: IDocumentRequest | null;
    loading: boolean;
    errorDocumentRequest: string[] | null;
}

const initialState: DocumentRequestState = {
    documentRequest: null,
    loading: false,
    errorDocumentRequest: null,
};

const documentRequestSlice = createSlice({
    name: 'documentRequest',
    initialState,
    reducers: {
        postDocumentRequestStart: (state, action: PayloadAction<IDocumentRequest | null>) => {
            state.loading = true;
            state.documentRequest = action.payload;
            state.errorDocumentRequest = null;
        },
        documentRequestErrors: (state, action: PayloadAction<string[]>) => {
            state.loading = true;
            state.errorDocumentRequest = action.payload;
        },
    },
});

export const { documentRequestErrors, postDocumentRequestStart } = documentRequestSlice.actions;
export default documentRequestSlice.reducer;