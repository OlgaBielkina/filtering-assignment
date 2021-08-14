import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FilterLabel, Props } from '../FilterLabel';

describe('FilterLabel', () => {
    const props: Props = {
        nodeId: '1',
        label: 'test name',
        onSelect: jest.fn(),
    };

    it('should render correctly', () => {
        const { asFragment } = render(<FilterLabel {...props} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should call onSelect callback when pressing a label', () => {
        const { getByText } = render(<FilterLabel {...props} />);

        fireEvent.click(getByText(props.label));

        expect(props.onSelect).toBeCalledTimes(1);
    });
});
