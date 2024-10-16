/* eslint-disable @typescript-eslint/no-explicit-any */
import jsCookie from 'js-cookie';
import { AppDispatch } from '../store';
import axiosInstance from '../../api/axios';
import {
    setAuthUserData,
    setAuthUserErrors,
    isAuthenticatedStatus,
    loginStart,
    setRecaptchaVerifiedSuccess,
    setRecaptchaError,
    profileStart,
} from './authSlice';

//LOGIN DE USUARIOS
export const loginUser = (loginData: { email: string; password: string }) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.post('/auth/login', loginData);
        jsCookie.set('token', response.data.token); 
        dispatch(loginStart(response.data.serResult));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setAuthUserErrors(error.response?.data.message));
        } else {
            dispatch(setAuthUserErrors(error.response?.data.message));
        }
    }
};

//VERIFICACION DEL reCAPTCHA
export const setRecaptchaVerified = (recaptchaToken: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.post('/auth/validate-recaptcha', { recaptchaToken });
        if (response.data.success) {
            dispatch(setRecaptchaVerifiedSuccess());
            return { success: true };
        } else {
            dispatch(setRecaptchaError('Validación fallida, reCAPTCHA inválido'));
            return { success: false };
        }
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setRecaptchaError(error.response?.data.message));
        } else {
            dispatch(setRecaptchaError(error.response?.data.message));
        }
    }
};

//VERIFICA EL TOKEN CADA QUE ENTRE A UNA RUTA PROTEGIDA
export const verifyTokenRequest = (token: string) => {
    return axiosInstance.get(`/auth/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

//PERFIL DE USUARIO
export const getProfileUser = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axiosInstance.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        dispatch(profileStart(response.data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch(setAuthUserErrors(error.response?.data.message));
        } else {
            dispatch(setAuthUserErrors(error.message));
        }
    }
};

//LOGOUT DE USUARIOS                        
export const logoutUser = () => (dispatch: AppDispatch) => {
    jsCookie.remove('token');
    dispatch(isAuthenticatedStatus(false));
    dispatch(setAuthUserData(null));
    window.location.href = "/login";
};