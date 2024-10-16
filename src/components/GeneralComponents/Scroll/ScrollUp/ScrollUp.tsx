import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import styles from './styles.module.css';

export default function ScrollUp() {
    const [ backToTopButton, setBackToTopButton ] = useState(false);
    useEffect (() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        })
    }, []);

    function scrollUp () {
        window.scroll({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            {backToTopButton && (
                <button className={`${styles.botonScroll} d-flex align-items-center justify-content-center border-0 position-fixed`} onClick={scrollUp}><IoIosArrowUp /></button>
            )}
        </div>
    );
}