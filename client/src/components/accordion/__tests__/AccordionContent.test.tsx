import React from 'react';
import { render } from '@testing-library/react';
import { AccordionContent } from '../AccordionContent';
import { AccordionContext, IAccordionContext } from '../Accordion';

describe('AccordionContent', () => {
    const providerData: IAccordionContext = {
        expanded: false,
        handleExpanded: jest.fn(),
    };

    it('should render collapsed content', () => {
        const { asFragment, getByText } = render(
            <AccordionContext.Provider value={providerData}>
                <AccordionContent>test text</AccordionContent>
            </AccordionContext.Provider>,
        );

        expect(getByText('test text')).toHaveClass('hidden');
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render expanded content', () => {
        const { asFragment, getByText } = render(
            <AccordionContext.Provider value={{ ...providerData, expanded: true }}>
                <AccordionContent>test text</AccordionContent>
            </AccordionContext.Provider>,
        );

        expect(getByText('test text')).not.toHaveClass('hidden');
        expect(asFragment()).toMatchSnapshot();
    });
});
