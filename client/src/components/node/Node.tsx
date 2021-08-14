import React from 'react';
import { Node as NodeType } from '../../types/types';
import { Accordion } from '../accordion/Accordion';
import { AccordionContent } from '../accordion/AccordionContent';
import { AccordionToogle } from '../accordion/AccordionToogle';
import { Checkbox } from '../checkbox/Checkbox';
import styles from './Node.module.scss';

export interface Props {
    node: NodeType;
    onSelect: (nodeId: string, selected: boolean) => void;
}

export const Node: React.FC<Props> = ({ node, onSelect }) => {
    const changeHandler = () => {
        onSelect(node.id, !node.selected);
    };

    return (
        <Accordion>
            <AccordionToogle collapsible={!!node.children.length}>
                <Checkbox label={node.name} onChange={changeHandler} checked={node.selected} className={styles.row} />
            </AccordionToogle>
            <AccordionContent>
                <div className={styles.offset}>
                    {node.children.map((child) => (
                        <Node key={child.id} node={child} onSelect={onSelect} />
                    ))}
                </div>
            </AccordionContent>
        </Accordion>
    );
};
