import React from 'react';
import { Node as NodeType } from '../types/types';
import { FilterLabel } from './filterLabel/FilterLabel';

interface Props {
    selectedNodes: NodeType[];
    onSelect: (nodeId: string, isSelected: boolean) => void;
}

export const Filters: React.FC<Props> = ({ selectedNodes, onSelect }) => {
    return (
        <>
            {selectedNodes.map((selectedNode) => {
                if (selectedNode.selected) {
                    return selectedNode.children.length ? (
                        <Filters key={selectedNode.id} selectedNodes={selectedNode.children} onSelect={onSelect} />
                    ) : (
                        <FilterLabel
                            key={selectedNode.id}
                            label={selectedNode.name}
                            nodeId={selectedNode.id}
                            onSelect={onSelect}
                        />
                    );
                }

                return null;
            })}
        </>
    );
};
