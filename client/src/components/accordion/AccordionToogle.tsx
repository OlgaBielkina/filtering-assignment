import React, { useContext } from 'react';
import classnames from 'classnames';
import { AccordionContext } from './Accordion';
import styles from './AccordionToogle.module.scss';

export interface Props {
    children: React.ReactNode;
    collapsible: boolean;
}

export const AccordionToogle: React.FC<Props> = ({ children, collapsible }) => {
    const context = useContext(AccordionContext);
    const handler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (collapsible && context.handleExpanded) {
            context.handleExpanded();
        }
    };

    return (
        <div className={styles.root} onClick={handler}>
            {children}
            {collapsible && (
                <span className={classnames('material-icons', styles.icon)}>
                    {context.expanded ? 'expand_less' : 'expand_more'}
                </span>
            )}
        </div>
    );
};
