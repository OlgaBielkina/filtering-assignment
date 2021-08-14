import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Checkbox, Props } from '../Checkbox';

describe('Checkbox', () => {
    const props: Props = {
        label: 'test label',
        checked: true,
        onChange: jest.fn(),
        className: 'testClass',
    };

    it('should render correctly', () => {
        const { asFragment } = render(<Checkbox {...props} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should check chekbox by pressing on label', () => {
        const { getByLabelText, getByRole } = render(<Checkbox {...props} />);

        fireEvent.click(getByLabelText(props.label));

        getByRole('checkbox', { checked: true });
    });

    it('should call an onChnage callback when checkbox is checked', () => {
        const { getByLabelText } = render(<Checkbox {...props} />);

        fireEvent.click(getByLabelText(props.label));

        expect(props.onChange).toBeCalledTimes(1);
    });

    it('should prevent click event propagation', () => {
        const onButtonClick = jest.fn();
        const { getByLabelText } = render(
            <button onClick={onButtonClick}>
                <Checkbox {...props} />
            </button>,
        );

        fireEvent.click(getByLabelText(props.label));

        expect(props.onChange).toBeCalledTimes(1);
        expect(onButtonClick).not.toBeCalled();
    });
});
