/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../redux/store';
import { clearUserErrors } from '../../redux/Auth/authSlice';
import { setRecaptchaVerified, loginUser } from '../../redux/Auth/actions';
//ELEMENTOS DEL COMPONENTE
import { IUserLogin } from '../../types/userLogin.types';
import LogoTopDriveGroup from '../../assets/TopDriveGroup/LogoTopDrive.svg';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { PiWarningCircle } from 'react-icons/pi';
// SANITIZACION
import { sanitizeInput } from '../../helpers/SanitizeForms/SanitizeForms';
import styles from './styles.module.css';

interface ConsultBranchPageProps {
    addNotification: (type: 'blocked' | 'error', message: string) => void;
}

function LoginPage({ addNotification }: ConsultBranchPageProps) {
    const { t } = useTranslation('login');
    const navigate = useNavigate();
    
    // REDUX
    const dispatch: AppDispatch = useDispatch();
    const authUserErrors = useSelector((state: RootState) => state.authUser.authUserErrors);
    const recaptchaError = useSelector((state: RootState) => state.authUser.recaptchaError);
    const isAuthenticated = useSelector((state: RootState) => state.authUser.isAuthenticated);

    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    useEffect(() => {
        dispatch(clearUserErrors());
    }, [dispatch]);

    const { register, formState: { errors }, handleSubmit } = useForm<IUserLogin>();
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = async (loginData: IUserLogin) => {
        const sanitizedEmail = sanitizeInput(loginData.email);
        const sanitizedLoginData = { email: sanitizedEmail, password: loginData.password };
        if (!captchaValue) {
            addNotification('error', 'Por favor verifica que no eres un robot.');
            return;
        }
        setLoading(true);
        try {
            const recaptchaResponse = await dispatch(setRecaptchaVerified(captchaValue));
            if (recaptchaResponse?.success) {  
                await dispatch(loginUser(sanitizedLoginData));
            } else addNotification('error', 'Validación de reCAPTCHA fallida.');
        } catch (error) {
            addNotification('error', 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof authUserErrors === 'string' && authUserErrors === 'Has bloqueado tu cuenta') {
            addNotification('blocked', 'Has bloqueado tu cuenta');
        } else if (Array.isArray(authUserErrors) && authUserErrors.includes('Has bloqueado tu cuenta')) {
            addNotification('blocked', 'Has bloqueado tu cuenta');
        }
    }, [authUserErrors]);  

    useEffect(() => {
        if (isAuthenticated) navigate("/panel-top-drive-group/configuration/user-management");
    }, [ isAuthenticated ]);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className={`${styles.container} d-flex align-items-center justify-content-center vh-100`}>
                <div className={`${styles.container__Component} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to="/">
                        <img src={LogoTopDriveGroup} alt="Top Drive Group" className={`${styles.logo} mb-4`} loading="lazy" />
                    </Link>
                    
                    <div className='position-relative'>
                        {authUserErrors && (
                            <div className={`${styles.errors__Login} p-2 text-center position-absolute w-100`}>
                                <p className='m-0'><PiWarningCircle /> {authUserErrors}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className='mb-2 d-flex align-items-center justify-content-center position-relative'>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className={`${styles.input} p-2 mb-3 border rounded`}
                                    placeholder={`${t('login.email__Placeholder')}`}
                                />
                                {errors.email && (
                                    <p className={`${styles.text__Danger} text-danger position-absolute`}>{t('login.email__Error')}</p>
                                )}
                            </div>

                            <div className='mb-2'>
                                <div className="rounded d-flex align-items-center justify-content-center position-relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password', { required: true })}
                                        className={`${styles.input} p-2 mb-3 border rounded`}
                                        placeholder={`${t('login.password__Placeholder')}`}
                                    />
                                    {showPassword ? (
                                        <RiEyeOffFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                    ) : (
                                        <RiEyeFill className={`${styles.icon} position-absolute`} onClick={toggleShowPassword} />
                                    )}
                                    {errors.password && (
                                        <p className={`${styles.text__Danger} text-danger position-absolute`}>{t('login.password__Error')}</p>
                                    )}
                                </div>
                            </div>

                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_reCAPTCHA_SITEWEBKEY}
                                onChange={setCaptchaValue}
                                className={`${styles.reCAPTCHA} mb-3 d-flex align-items-center justify-content-center`}
                            />

                            {recaptchaError && <p className="error">{recaptchaError}</p>}

                            <div className="d-flex">
                                {loading ? 
                                    <div className={`${styles.container__Loading} `}>
                                        <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >
                                            <span className={`${styles.role} spinner-border spinner-border-sm`} role="status"></span> Login...
                                        </button>
                                    </div> 
                                :
                                    <button className={`${styles.button__Submit} border-0 rounded m-auto text-decoration-none`} type='submit' >Login</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;