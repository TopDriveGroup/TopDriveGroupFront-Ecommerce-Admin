/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '../../store';
import axiosInstance from '../../../api/axios';
import { IProduct } from '../../../types/product.types';
import { setProductData, setErrorProduct, postProductStart, postManyProductsStart, getProductsStart, getAllProductStart, getProductByIdStart, putProductStart, deleteProductStart, patchLogicalDeleteProductStart, patchActivateLogicalDeleteProductStart, getProductsLogicalStart,  } from './productSlice';

//CREAR UN PRODUCTO
export const postProduct = (formData: IProduct, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postProductStart(formData));
        const response = await axiosInstance.post('/top-drive/product', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(setProductData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//CREAR MASIVAMENTE PRODUCTOS
export const postManyProducts = (formData: IProduct[], token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(postManyProductsStart(formData));
        const response = await axiosInstance.post('/top-drive/product/create-many', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(setProductData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//OBTENER TODOS LOS PRODUCTOS INCLUYENDO LOS DE BORRADO LOGICO
export const getProducts = (token: string, page: number = 1, limit?: number) => async (dispatch: AppDispatch) => {
    dispatch(setProductData());
    try {
        const response = await axiosInstance.get('/top-drive/product', {
            params: {
                page,
                limit
            },
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getProductsStart({
            products: response.data.result,
            totalProducts: response.data.totalProducts,
            totalPages: response.data.totalPages,
            currentPage: page,
        }));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//OBTENER TODOS LOS PRODUCTOS INCLUYENDO LOS DE BORRADO LOGICO
export const getAllProduct = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/ecommerce/products-with-units`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getAllProductStart(response.data.result));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//OBTENER UN PRODUCTO POR ID
export const getProductById = (idProducts: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get(`/top-drive/product/${idProducts}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getProductByIdStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//ACTUALIZAR UN PRODUCTO
export const putProduct = (idProducts: string, formData: IProduct, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(putProductStart());
        const response = await axiosInstance.put(`/top-drive/product/${idProducts}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(setProductData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//ELIMINAR PERMANENTEMENTE UN PRODUCTO
export const deleteProduct = (idProducts: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteProductStart());
        const response = await axiosInstance.delete(`/top-drive/product/${idProducts}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(setProductData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//ELIMINAR CON BORRADO LOGICO UN PRODUCTO
export const patchLogicalDeleteProduct = (idProducts: string, formData: IProduct, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchLogicalDeleteProductStart());
        const response = await axiosInstance.patch(`/top-drive/product/${idProducts}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(setProductData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
}

//ACTIVAR UN PRODUCTO ELIMINADO CON BORRADO LOGICO
export const patchActivateLogicalDeleteProduct = (idProducts: string, formData: IProduct, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(patchActivateLogicalDeleteProductStart());
        const response = await axiosInstance.patch(`/top-drive/product/${idProducts}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(setProductData(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 500) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
}

//OBTENER TODOS LOS PRODUCTOS CON BORRADO LOGICO
export const getProductsLogical = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/top-drive/product', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(getProductsLogicalStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setErrorProduct(error.response?.data.message));
        } else {
            dispatch(setErrorProduct(error.message));
        }
    }
};

//ACTUALIZAR MASIVAMENTE PRODUCTOS