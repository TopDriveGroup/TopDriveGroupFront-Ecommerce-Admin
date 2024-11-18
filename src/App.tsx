import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';

// GENERALES
import LinkedIn from './components/GeneralComponents/SocialNetwork/LinkedIn/LinkedIn';
import WhatsApp from './components/GeneralComponents/SocialNetwork/WhatsApp/WhatsApp';
import Scroll from './components/GeneralComponents/Scroll/ScrollUp/ScrollUp';
import ScrollToTop from './components/GeneralComponents/Scroll/ScrollToTop/ScrollToTop';
import SessionManager from './SessionManager';
import Notification from './components/GeneralComponents/Notifications/Notification';
// LANDINGPAGE
import LoginPage from './pages/Login/LoginPage';
// PROTECTEDROUTES
import ProtectedRoute from './ProtectedRoute';
//PANEL TOP DRIVE
import ConfigurationTopDriveGroupPage from './pages/PanelTopDriveGroup/01Configuration/ConfigurationTopDriveGroupPage';
import ProductsTopDriveGroupPage from './pages/PanelTopDriveGroup/02Products/ProductsTopDriveGroupPage';
import ProductsSapTopDriveGroupPage from './pages/PanelTopDriveGroup/02Products/ProductsSapTopDriveGroup/ProductsSapTopDriveGroupPage';
import CreateProductTopDriveGroupPage from './pages/PanelTopDriveGroup/02Products/CreateProduct/CreateProductTopDriveGroupPage';
import MassiveImageUpdatesPage from './pages/PanelTopDriveGroup/02Products/MassiveImageUpdates/MassiveImageUpdatesPage';
import CreateManyProductTopDriveGroupPage from './pages/PanelTopDriveGroup/02Products/CreateManyProduct/CreateManyProductTopDriveGroupPage';
import EditProductTopDriveGroupPage from './pages/PanelTopDriveGroup/02Products/EditProduct/EditProductTopDriveGroupPage';
import ActiveCustomerQuotationsPage from './pages/PanelTopDriveGroup/03CustomerQuotes/01ActiveCustomerQuotations/ActiveCustomerQuotationsPage';
import HistoryCustomerQuotationsPage from './pages/PanelTopDriveGroup/03CustomerQuotes/02HistoryCustomerQuotations/HistoryCustomerQuotationsPage';
import ActiveCustomerOrdersPage from './pages/PanelTopDriveGroup/04CustomerOrders/01ActiveCustomerOrders/ActiveCustomerOrdersPage';
import PaymentsPendingStatusPage from './pages/PanelTopDriveGroup/04CustomerOrders/02PaymentsPendingStatus/PaymentsPendingStatusPage';
import HistoryCustomerOrdersPage from './pages/PanelTopDriveGroup/04CustomerOrders/03HistoryCustomerOrders/HistoryCustomerOrders';
import AllCustomersPage from './pages/PanelTopDriveGroup/07Clients/01AllCustomers/AllCustomersPage';
import DocumentRequestTopDriveGroupPage from './pages/PanelTopDriveGroup/08DocumentRequest/DocumentRequestTopDriveGroupPage';
import ElectronicInvoicesTopDriveGroupPage from './pages/PanelTopDriveGroup/09ElectronicInvoices/ElectronicInvoicesTopDriveGroupPage';
// ERROR404
import Error404 from './pages/Error404/Error404';

function App() {
    const [notifications, setNotifications] = useState<{ id: number; type: 'success' | 'delete' | 'blocked' | 'error'; message: string }[]>([]);

    const addNotification = (type: 'success' | 'delete' | 'blocked' | 'error', message: string) => {
      const id = Date.now();
      setNotifications([...notifications, { id, type, message }]);
      setTimeout(() => {
        setNotifications((notifications) => notifications.filter(notification => notification.id !== id));
      }, 5000);
    };

    return (
        <div>
            <BrowserRouter>
                <LinkedIn />
                <WhatsApp />
                <Scroll />
                <ScrollToTop />
                <SessionManager />
                <div className="notification__Container">
                    {notifications.map(({ id, type, message }) => (
                        <Notification key={id} type={type} message={message} onClose={() => setNotifications(notifications.filter(notification => notification.id !== id))} />
                    ))}
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path='/login' element={<LoginPage addNotification={addNotification} />} />
                    {/* PROTECTED ROUTES */}
                    <Route element={<ProtectedRoute />}>
                        {/* ----------SIDEBAR TOP DRIVE - CONFIGURATION---------- */}
                        <Route path='/panel-top-drive-group/configuration/user-management' element={<ConfigurationTopDriveGroupPage />} />
                        {/* ----------SIDEBAR TOP DRIVE - PRODUCTS---------- */}
                        <Route path='/panel-top-drive-group/products/consult' element={<ProductsTopDriveGroupPage />} />
                        <Route path='/panel-top-drive-group/products/consult-sap' element={<ProductsSapTopDriveGroupPage />} />
                        <Route path='/panel-top-drive-group/products/create-product' element={<CreateProductTopDriveGroupPage />} />
                        <Route path='/panel-top-drive-group/products/massive-image-updates' element={<MassiveImageUpdatesPage />} />
                        <Route path='/panel-top-drive-group/products/create-many-products' element={<CreateManyProductTopDriveGroupPage />} />
                        <Route path='/panel-top-drive-group/products/edit-product/:idProduct' element={<EditProductTopDriveGroupPage />} />
                        {/* ----------SIDEBAR TOP DRIVE - QUOTES---------- */}
                        <Route path='/panel-top-drive-group/quotes-clients/active-customer-quotations' element={<ActiveCustomerQuotationsPage />} />
                        <Route path='/panel-top-drive-group/quotes-clients/history-customer-quotations' element={<HistoryCustomerQuotationsPage />} />
                        {/* ----------SIDEBAR TOP DRIVE - CUSTOMER ORDERS---------- */}
                        <Route path='/panel-top-drive-group/customer-orders/active-customer-orders' element={<ActiveCustomerOrdersPage />} />
                        <Route path='/panel-top-drive-group/customer-orders/payments-pending-status' element={<PaymentsPendingStatusPage />} />
                        <Route path='/panel-top-drive-group/customer-orders/history-customer-orders' element={<HistoryCustomerOrdersPage />} />
                        {/* ----------SIDEBAR TOP DRIVE - CLIENTS---------- */}
                        <Route path='/panel-top-drive-group/customers/all-customers' element={<AllCustomersPage />} />
                        {/* ----------SIDEBAR TOP DRIVE - DOCUMENT REQUEST---------- */}
                        <Route path='/panel-top-drive-group/document-request' element={<DocumentRequestTopDriveGroupPage />} />
                        {/* ----------SIDEBAR TOP DRIVE - ELECTRONIC INVOICES---------- */}
                        <Route path='/panel-top-drive-group/electronic-invoices' element={<ElectronicInvoicesTopDriveGroupPage />} />
                    </Route>
                    {/* ERROR 404 */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;