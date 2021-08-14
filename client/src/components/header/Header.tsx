import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './Header.module.scss';

export const Header: React.FC<{}> = () => (
    <header className={styles.root}>
        <a href="/">
            <Logo className={styles.logo} />
        </a>
    </header>
);
