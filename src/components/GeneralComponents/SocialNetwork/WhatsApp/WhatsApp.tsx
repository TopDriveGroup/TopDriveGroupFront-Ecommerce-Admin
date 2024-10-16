import logo from '../../../../assets/WhatsApp.png';
import styles from "./styles.module.css";

export default function WhatsApp () {
    const phoneNumber = '573112712405';

    function handleWhatsAppClick () {
        const url = `whatsapp://send?phone=${phoneNumber}`;
        window.location.href = url;
    }

    return (
        <div className={`${styles.social__Network_Landgin} position-fixed`}>
            <div onClick={handleWhatsAppClick} >
                <img className={`${styles.social__Network}`} src={logo} alt="WhatsApp" />
            </div>
        </div>
    );
}