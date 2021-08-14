import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { AccordionToogle, Props } from '../AccordionToogle';
import { AccordionContext, IAccordionContext } from '../Accordion';

describe('AccordionToogle', () => {
    const props: Omit<Props, 'children'> = {
        collapsible: true,
    };
    const providerData: IAccordionContext = {
        expanded: false,
        handleExpanded: jest.fn(),
    };

    it('should render collapsed toggle', () => {
        const { asFragment, getByText } = render(
            <AccordionContext.Provider value={providerData}>
                <AccordionToogle {...props}>test text</AccordionToogle>
            </AccordionContext.Provider>,
        );

        getByText('expand_more');
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render expanded toggle', () => {
        const { asFragment, getByText } = render(
            <AccordionContext.Provider value={{ ...providerData, expanded: true }}>
                <AccordionToogle {...props}>test text</AccordionToogle>
            </AccordionContext.Provider>,
        );

        getByText('expand_less');
        expect(asFragment()).toMatchSnapshot();
    });

    it('should not render collapsible toggle', () => {
        const { asFragment, queryByText } = render(
            <AccordionContext.Provider value={providerData}>
                <AccordionToogle {...{ ...props, collapsible: false }}>test text</AccordionToogle>
            </AccordionContext.Provider>,
        );

        expect(queryByText('expand_less')).not.toBeInTheDocument();
        expect(queryByText('expand_more')).not.toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should chnage icon when user press toggle', () => {
        const { getByText } = render(
            <AccordionContext.Provider value={providerData}>
                <AccordionToogle {...props}>test text</AccordionToogle>
            </AccordionContext.Provider>,
        );

        fireEvent.click(getByText('expand_more'));

        expect(providerData.handleExpanded).toBeCalledTimes(1);
    });
});
