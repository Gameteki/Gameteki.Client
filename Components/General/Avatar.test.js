import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './Avatar';

describe('The Avatar component', () => {
    let wrapper;

    test('renders without crashing', () => {
        shallow(<Avatar />);
    });

    describe('when no username specified', () => {
        test('nothing should be rendered', () => {
            wrapper = shallow(<Avatar />);

            expect(wrapper.exists('img')).toBe(false);
        });
    });

    describe('when username is specified', () => {
        beforeEach(() =>{
            wrapper = shallow(<Avatar username='test'/>);
        });

        test('an image is rendered', () => {
            expect(wrapper.exists('img')).toBe(true);
        });

        test('an image with the username should be rendered', () => {
            expect(wrapper.prop('src')).toContain('test');
        });
    });
});
