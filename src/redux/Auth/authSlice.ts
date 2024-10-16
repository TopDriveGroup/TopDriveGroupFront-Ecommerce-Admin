import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserPlatform } from '../../types/userPlatform.types';
import { ITopDriveGroup } from '../../types/topDriveGroup.types';


interface authUserState {
    authUser: IUserPlatform | ITopDriveGroup | null;
    loading: boolean;
    authUserErrors: string[] | null;
    isAuthenticated: boolean;
    recaptchaVerified: boolean;
    recaptchaError: string | null;
}

const initialState: authUserState = {
    authUser: null,
    loading: false,
    authUserErrors: null,
    isAuthenticated: false,
    recaptchaVerified: false,
    recaptchaError: null,
};

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        // SETEA LA AUTENTICACION DEL CLIENTE
        setAuthUserData: (state, action: PayloadAction<IUserPlatform | ITopDriveGroup | null>) => {
            state.loading = false;
            state.authUser = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        // SETEA LOS ERRORES EN LA AUTENTICACION DEL CLIENTE
        setAuthUserErrors: (state, action: PayloadAction<string[]>) => {
            state.loading = true;
            state.authUserErrors = action.payload;
        },
        // GUARDA LA AUTENTICACION DEL CLIENTE
        isAuthenticatedStatus: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        // LOGIN
        loginStart: (state, action: PayloadAction<IUserPlatform | ITopDriveGroup | null>) => {
            state.loading = false;
            state.authUser = action.payload;
            state.isAuthenticated = true;
        },
        // OBTIENE LA INFORMACION DE PERFIL DEL CLIENTE
        profileStart: (state, action: PayloadAction<IUserPlatform | ITopDriveGroup | null>) => {
            state.loading = false;
            state.authUser = action.payload;
            state.isAuthenticated = true;
        },
        // RESETEA TODOS LOS ERROES
        clearUserErrors: (state) => {
            state.loading = false;
            state.authUserErrors = null;
        },
        // SETEA LA CORRECTA VALIDACION DEL reCAPTCHA
        setRecaptchaVerifiedSuccess: (state) => {
            state.recaptchaVerified = true;
            state.recaptchaError = null;
        },
        // SETEA EL ERROR EN LA VALIDACION DEL reCAPTCHA
        setRecaptchaError: (state, action: PayloadAction<string>) => {
            state.recaptchaVerified = false;
            state.recaptchaError = action.payload;
        },
    },
});

export const { setAuthUserData, setAuthUserErrors, isAuthenticatedStatus, loginStart, profileStart, clearUserErrors, setRecaptchaVerifiedSuccess, setRecaptchaError } = authUserSlice.actions;
export default authUserSlice.reducer;