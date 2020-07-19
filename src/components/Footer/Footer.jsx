import React from 'react';
import { Typography } from '@material-ui/core';

import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.container}>
            <Typography className={styles.font}>
                <span role='img' aria-label='copyright'>&copy;</span> Saba Azam - 2020
            </Typography>
        </div>
    )
}

export default Footer;