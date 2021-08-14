import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Node, Props } from '../Node';

describe('Node', () => {
    const props: Props = {
        node: {
            id: '1',
            count: 1,
            parent: '0',
            name: 'test name 1',
            children: [
                {
                    id: '2',
                    count: 1,
                    parent: '1',
                    name: 'test name 2',
                    children: [],
                    selected: false,
                },
                {
                    id: '3',
                    count: 1,
                    parent: '1',
                    name: 'test name 3',
                    children: [
                        {
                            id: '4',
                            count: 1,
                            parent: '3',
                            name: 'test name 4',
                            children: [],
                            selected: false,
                        },
                    ],
                    selected: false,
                },
            ],
            selected: false,
        },
        onSelect: jest.fn(),
    };

    it('should render correctly', () => {
        const { asFragment } = render(<Node {...props} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should render all nodes collapsed', () => {
        const { getAllByTestId } = render(<Node {...props} />);

        getAllByTestId('accordionContent').forEach((content) => {
            expect(content).toHaveClass('hidden');
        });
    });

    it('should call onSelect when user pressed on checkbox', () => {
        const { getByLabelText } = render(<Node {...props} />);

        fireEvent.click(getByLabelText(props.node.name));

        expect(props.onSelect).toBeCalledWith(props.node.id, !props.node.selected);
    });

    it('should expand node subtree when user pressed expan button', () => {
        const { getAllByText, getAllByTestId } = render(<Node {...props} />);

        fireEvent.click(getAllByText('expand_more')[0]);

        expect(getAllByTestId('accordionContent')[0]).not.toHaveClass('hidden');
    });
});
