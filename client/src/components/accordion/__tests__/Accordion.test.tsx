import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { AccordionContent } from '../AccordionContent';
import { Accordion } from '../Accordion';
import { AccordionToogle } from '../AccordionToogle';

describe('Accordion', () => {
    it('should render collapsed content', () => {
        const { asFragment, getByText } = render(
            <Accordion>
                <AccordionToogle collapsible>toggle</AccordionToogle>
                <AccordionContent>test text</AccordionContent>
            </Accordion>,
        );

        expect(getByText('test text')).toHaveClass('hidden');
        expect(asFragment()).toMatchSnapshot();
    });

    it('should expand content when user clicks toggle', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionToogle collapsible>toggle</AccordionToogle>
                <AccordionContent>test text</AccordionContent>
            </Accordion>,
        );

        fireEvent.click(getByText('toggle'));

        expect(getByText('test text')).not.toHaveClass('hidden');
    });
});
