import React from 'react';
import { Category } from '../../types/types';
import { createTree, updateTree } from '../tree';

describe('Tree', () => {
    const categories: Category[] = [
        { id: '14096', count: 137, parent: '14100', name: 'Kleding' },
        { id: '14098', count: 2, parent: '14096', name: 'Badmode' },
        { id: '14105', count: 32, parent: '14096', name: 'Jurken' },
        { id: '21249', count: 0, parent: '21251', name: 'Shoes' },
        { id: '14100', count: 136, parent: '0', name: 'Dames' },
        { id: '21251', count: 14, parent: '0', name: 'Heren' },
        { id: '21253', count: 14, parent: '21251', name: 'T-shirts' },
    ];

    it('should create tree', () => {
        const tree = createTree('0', categories);
        const expectedTree = [
            {
                id: '14100',
                count: 136,
                parent: '0',
                name: 'Dames',
                selected: false,
                children: [
                    {
                        id: '14096',
                        count: 137,
                        parent: '14100',
                        name: 'Kleding',
                        selected: false,
                        children: [
                            { id: '14098', count: 2, parent: '14096', name: 'Badmode', selected: false, children: [] },
                            { id: '14105', count: 32, parent: '14096', name: 'Jurken', selected: false, children: [] },
                        ],
                    },
                ],
            },
            {
                id: '21251',
                count: 14,
                parent: '0',
                name: 'Heren',
                selected: false,
                children: [
                    { id: '21249', count: 0, parent: '21251', name: 'Shoes', selected: false, children: [] },
                    { id: '21253', count: 14, parent: '21251', name: 'T-shirts', selected: false, children: [] },
                ],
            },
        ];

        expect(tree).toEqual(expectedTree);
    });

    it('should update selected property for all parent categories', () => {
        const tree = createTree('0', categories);
        const expectedTree = [
            {
                id: '14100',
                count: 136,
                parent: '0',
                name: 'Dames',
                selected: true,
                children: [
                    {
                        id: '14096',
                        count: 137,
                        parent: '14100',
                        name: 'Kleding',
                        selected: true,
                        children: [
                            { id: '14098', count: 2, parent: '14096', name: 'Badmode', selected: true, children: [] },
                            { id: '14105', count: 32, parent: '14096', name: 'Jurken', selected: false, children: [] },
                        ],
                    },
                ],
            },
            {
                id: '21251',
                count: 14,
                parent: '0',
                name: 'Heren',
                selected: false,
                children: [
                    { id: '21249', count: 0, parent: '21251', name: 'Shoes', selected: false, children: [] },
                    { id: '21253', count: 14, parent: '21251', name: 'T-shirts', selected: false, children: [] },
                ],
            },
        ];

        expect(updateTree(tree, '14098', true)).toEqual(expectedTree);
    });

    it('should deselect parent and children categories', () => {
        const tree = createTree('0', categories);
        const expectedTree = [
            {
                id: '14100',
                count: 136,
                parent: '0',
                name: 'Dames',
                selected: false,
                children: [
                    {
                        id: '14096',
                        count: 137,
                        parent: '14100',
                        name: 'Kleding',
                        selected: false,
                        children: [
                            { id: '14098', count: 2, parent: '14096', name: 'Badmode', selected: false, children: [] },
                            { id: '14105', count: 32, parent: '14096', name: 'Jurken', selected: false, children: [] },
                        ],
                    },
                ],
            },
            {
                id: '21251',
                count: 14,
                parent: '0',
                name: 'Heren',
                selected: false,
                children: [
                    { id: '21249', count: 0, parent: '21251', name: 'Shoes', selected: false, children: [] },
                    { id: '21253', count: 14, parent: '21251', name: 'T-shirts', selected: false, children: [] },
                ],
            },
        ];

        updateTree(tree, '14098', true);
        updateTree(tree, '14105', true);

        expect(updateTree(tree, '14096', false)).toEqual(expectedTree);
    });
});
