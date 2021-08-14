import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SidePanel } from '../SidePanel';

describe('SidePanel', () => {
    const buttonText = 'toggle panel';

    it('should render mobile side panel', () => {
        global.innerWidth = 760;
        window.dispatchEvent(new Event('resize'));

        const { asFragment } = render(
            <SidePanel text={buttonText}>
                <span></span>
            </SidePanel>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should open side panel', () => {
        global.innerWidth = 760;
        window.dispatchEvent(new Event('resize'));

        const { getByTestId, getByText } = render(
            <SidePanel text={buttonText}>
                <span></span>
            </SidePanel>,
        );
        expect(getByTestId('side-panel')).not.toHaveClass('visible');

        fireEvent.click(getByText(buttonText));

        expect(getByTestId('side-panel')).toHaveClass('visible');
    });

    it('should close side panel', () => {
        global.innerWidth = 760;
        window.dispatchEvent(new Event('resize'));

        const { getByTestId, getByText } = render(
            <SidePanel text={buttonText}>
                <span></span>
            </SidePanel>,
        );
        expect(getByTestId('side-panel')).not.toHaveClass('visible');

        fireEvent.click(getByText(buttonText));

        expect(getByTestId('side-panel')).toHaveClass('visible');

        fireEvent.click(getByText('close'));

        expect(getByTestId('side-panel')).not.toHaveClass('visible');
    });
});
