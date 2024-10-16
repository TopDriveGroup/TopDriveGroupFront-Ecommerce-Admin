/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IDocumentRequest } from '../../../types/documentRequest.types';
import { documentRequestErrors, postDocumentRequestStart } from './documentRequestSlice';

//CREAR SOLICITUD DE DOCUMENTOS POR PARTE DEL CLIENTE
export const postDocumentRequest = (formData: IDocumentRequest) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postDocumentRequestStart(formData));
        return await axiosInstance.post(`/document-request`, formData);
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(documentRequestErrors(error.response?.data));
        } else {
            dispatch(documentRequestErrors(error));
        }
    }
};