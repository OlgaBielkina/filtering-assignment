import React, { useContext } from 'react';
import { AccordionContext } from './Accordion';
import styles from './AccordionContent.module.scss';

interface Props {
    children: React.ReactNode;
}

export const AccordionContent: React.FC<Props> = ({ children }) => {
    const context = useContext(AccordionContext);

    return (
        <div data-testid="accordionContent" className={context.expanded ? '' : styles.hidden}>
            {children}
        </div>
    );
};
