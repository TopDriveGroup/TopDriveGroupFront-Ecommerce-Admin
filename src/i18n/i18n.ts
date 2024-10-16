import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// -----INGLES----- //
// ECOMMERCE
import enNavBar from './locales/en/Landing/01NavBar/EnNavBar.json';
import enLogin from './locales/en/Landing/01NavBar/EnLogin.json';
import enFooter from './locales/en/Landing/11Footer/EnFooter.json';
// HELPERS
import enDepartmentAndCity from './locales/en/helpers/DepartmentAndCity/EnDepartmentAndCity.json';

// -----ESPAÑOL----- //
// ECOMMERCE
import esNavBar from './locales/es/Landing/01NavBar/EsNavBar.json';
import esLogin from './locales/es/Landing/01NavBar/EsLogin.json';
import esFooter from './locales/es/Landing/11Footer/EsFooter.json';
// HELPERS
import esDepartmentAndCity from './locales/es/helpers/DepartmenAndCity/EsDepartmenAndCity.json';

const resources = {
    en: {
        // ECOMMERCE
        navBar: enNavBar,
        login: enLogin,
        footer: enFooter,
        // HELPERS
        departmentAndCity: enDepartmentAndCity,
    },
    
    es: {
        // ECOMMERCE
        navBar: esNavBar,
        login: esLogin,
        footer: esFooter,
        // HELPERS
        departmentAndCity: esDepartmentAndCity,
    }
};

// Obtener el idioma almacenado en localStorage o usar 'es' como predeterminado
const savedLanguage = localStorage.getItem('language') || 'es';

i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'es',
    ns: [
        // ECOMMERCE
        'navBar',
        'login',
        'footer',
        // HELPES
        'departmentAndCity',
    ],
    defaultNS: 'navBarLanding',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;