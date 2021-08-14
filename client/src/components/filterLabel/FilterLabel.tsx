import React, { useCallback } from 'react';
import classnames from 'classnames';
import styles from './FilterLabel.module.scss';

export interface Props {
    label: string;
    nodeId: string;
    onSelect: (nodeId: string, isSelected: boolean) => void;
}

export const FilterLabel: React.FC<Props> = ({ onSelect, label, nodeId }) => {
    const clickHandler = useCallback(() => {
        onSelect(nodeId, false);
    }, [nodeId, onSelect]);

    return (
        <span onClick={clickHandler} className={styles.root}>
            <span className={classnames('material-icons', styles.closeIcon)}>close</span>
            <span className={styles.label}>{label}</span>
        </span>
    );
};
