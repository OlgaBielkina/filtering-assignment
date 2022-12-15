import React, { useState, useEffect } from 'react';
import useFetch from 'react-fetch-hook';
import { createTree, updateTree } from './utils/tree';
import { Node } from './components/node/Node';
import { Node as NodeType, ApiResponse } from './types/types';
import Skeleton from 'react-loading-skeleton';
import { Header } from './components/header/Header';
import { SidePanel } from './components/sidePanel/SidePanel';
import { Filters } from './components/Filters';
import { FilterLabel } from './components/filterLabel/FilterLabel';
import './styles/global.module.scss';
import styles from './App.module.scss';

const ROOT_CATEGORY_ID = '0';

function App(): JSX.Element | null {
    const [tree, setTree] = useState<NodeType[]>([]);
    const { data, isLoading, error } = useFetch<ApiResponse>('/filters');
    useEffect(() => {
        if (data) {
            const categories = data.data.categories;
            setTree(createTree(ROOT_CATEGORY_ID, categories));
        }
    }, [data]);

    const toggleNodeSelection = (nodeId: string, isSelected: boolean) => {
        const newTree: NodeType[] = updateTree(tree, nodeId, isSelected);
        setTree(newTree);
    };

    const hasSelectedNodes = tree && tree.some((child) => child.selected);

    return (
        <div className={styles.root}>
            <Header />
            <div className={styles.content}>
                <SidePanel text="filters">
                    {!isLoading &&
                        !error &&
                        tree.map((node) => <Node key={node.id} node={node} onSelect={toggleNodeSelection} />)}
                    {isLoading && <Skeleton className="skeleton" count={3} width={200} />}
                    {error && <span>Failed to load filters</span>}
                </SidePanel>

                <main className={styles.main}>
                    <div className={styles.filters}>
                        <Filters selectedNodes={tree} onSelect={toggleNodeSelection} />
                        {hasSelectedNodes && (
                            <FilterLabel label="Reset all :) :)" nodeId={ROOT_CATEGORY_ID} onSelect={toggleNodeSelection} />
                        )}
                    </div>
                    <div className={styles.products}>Product loaded here ...</div>
                </main>
            </div>
        </div>
    );
}

export default App;
