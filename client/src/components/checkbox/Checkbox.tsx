import React, { useCallback } from 'react';
import classnames from 'classnames';
import styles from './Checkbox.module.scss';

export interface Props {
    label: string;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export const Checkbox: React.FC<Props> = ({ label, checked = false, onChange, className }) => {
    const handleClick = useCallback((event: React.MouseEvent<HTMLLabelElement>) => {
        event.stopPropagation();
    }, []);

    return (
        <label className={classnames(styles.root, className)} onClick={handleClick}>
            <input type="checkbox" checked={checked} onChange={onChange} className={styles.input} />
            <span className="label">{label}</span>
        </label>
    );
};
