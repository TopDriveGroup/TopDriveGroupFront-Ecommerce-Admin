import linkedinLogo from '../../../../assets/LinkedIn2.png';
import styles from "./styles.module.css";

export default function LinkedIn() {
    const linkedinCompanyProfile = 'https://www.linkedin.com/company/top-drive-group/';

    function handleLinkedInClick() {
        window.open(linkedinCompanyProfile, '_blank');
    }

    return (
        <div className={`${styles.social__Network_Landgin} position-fixed`}>
            <div onClick={handleLinkedInClick} className={styles.icon}>
                <img className={`${styles.social__Network}`} src={linkedinLogo} alt="LinkedIn" />
            </div>
        </div>
    );
}