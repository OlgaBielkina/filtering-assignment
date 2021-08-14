import { Category, Node } from '../types/types';

export const createTree = (parentId: string, categories: Category[]): Node[] => {
    const children = categories.filter((category) => category.parent === parentId);

    return children.map(
        (child: Category) =>
            ({
                ...child,
                children: createTree(child.id, categories),
                selected: false,
            } as Node),
    );
};

export const updateTree = (tree: Node[], nodeId: string, selected: boolean): Node[] => {
    return tree.map((treeNode) => {
        let newTreeNode = treeNode;
        if (treeNode.id === nodeId || treeNode.parent === nodeId) {
            const children = updateTree(treeNode.children, treeNode.id, selected);

            return {
                ...treeNode,
                children,
                selected,
            };
        }

        if (treeNode.children.length) {
            const children = updateTree(treeNode.children, nodeId, selected);
            newTreeNode.children = children;
            const hasSelected = children.some((child) => child.selected);

            if (!hasSelected && newTreeNode.selected) {
                newTreeNode = {
                    ...treeNode,
                    selected: false,
                };
            }

            if (hasSelected && !newTreeNode.selected) {
                newTreeNode = {
                    ...treeNode,
                    selected: true,
                };
            }
        }

        return newTreeNode;
    });
};
