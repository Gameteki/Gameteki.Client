import React from 'react';
import { shallow } from 'enzyme';

import { Link } from './Link';

const testUrl = 'https://example.com';

describe('The Link component', () => {
    let wrapper;

    test('renders without crashing', () => {
        shallow(<Link />);
    });

    describe('when a href is specified', () => {
        beforeEach(() => {
            wrapper = shallow(<Link href={ testUrl } />);
        });

        test('a link is rendered', () => {
            expect(wrapper.exists('a')).toBe(true);
        }); 

        test('the link href is set', () => {
            let link = wrapper.find('a');

            expect(link.prop('href')).toBe(testUrl);
        });

        describe('and the link is clicked', () => {
            let navigate;
            
            beforeEach(() => {
                navigate = jest.fn();
                wrapper = shallow(<Link href={ testUrl } navigate={ navigate } />);

                let link = wrapper.find('a');

                link.simulate('click', { preventDefault: () => {}});
            });
            
            test('navigate is called to the link', () => {
                expect(navigate).toHaveBeenCalledWith(testUrl);
            });
        });
    });
});
