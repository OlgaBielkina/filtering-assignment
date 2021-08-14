import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './SidePanel.module.scss';

interface Props {
    text: string;
    children: React.ReactNode;
}

export const SidePanel: React.FC<Props> = ({ text, children }) => {
    const [panelOpened, setPanelOpened] = useState<boolean>(false);
    const toggleFilters = () => {
        setPanelOpened(!panelOpened);
    };

    return (
        <div>
            <button className={styles.toggleButton} onClick={toggleFilters}>
                {text}
            </button>
            <aside data-testid="side-panel" className={classnames(styles.panel, panelOpened ? styles.visible : '')}>
                <span onClick={toggleFilters} className={classnames('material-icons', styles.closeButton)}>
                    close
                </span>
                {children}
            </aside>
        </div>
    );
};
