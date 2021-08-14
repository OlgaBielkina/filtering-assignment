import React, { useState } from 'react';

interface Props {
    children: React.ReactNode;
}

export interface IAccordionContext {
    expanded: boolean;
    handleExpanded?: () => void;
}

export const AccordionContext = React.createContext<IAccordionContext>({
    expanded: false,
    handleExpanded: undefined,
});

export const Accordion: React.FC<Props> = ({ children }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpanded = () => setExpanded(!expanded);
    const data = { expanded, handleExpanded };

    return <AccordionContext.Provider value={data}>{children}</AccordionContext.Provider>;
};
