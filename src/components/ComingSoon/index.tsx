import React from 'react';
import styles from './styles.module.scss';

export default function ComingSoon(props: {name: string}) {
    return (
        <div className={styles.box}>
            <img
                className={styles.img}
                alt="coming soon"
                src="/img/coming_soon.svg"
                loading="lazy"
            />
            <span className={styles.title}>
                <span>{props.name}</span> coming soon!
            </span>
        </div>
    );
}
