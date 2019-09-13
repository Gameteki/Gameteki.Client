import React from 'react';
import { shallow } from 'enzyme';

import Modal from './Modal';
import { isContext } from 'vm';

describe('The Modal component', () => {
    let wrapper;

    test('renders without crashing', () => {
        shallow(<Modal />);
    });

    describe('when id is passed in', () => {
        test('the id is set', () => {
            wrapper = shallow(<Modal id='test' />);

            expect(wrapper.exists('#test')).toBe(true);
        });
    });

    describe('when title is passed in', () => {
        test('the title is set', () => {
            wrapper = shallow(<Modal id='test' title='title' />);

            let title = wrapper.find('.modal-title');

            expect(title.text()).toBe('title');
        });
    });

    describe('when className is passed in', () => {
        test('the class is set', () => {
            wrapper = shallow(<Modal id='test' title='title' className='class' />);

            expect(wrapper.exists('.class')).toBe(true);
        });
    });

    describe('when children are passed in', () => {
        test('the children are rendered', () => {
            wrapper = shallow(<Modal><div id='test'>This is a test</div></Modal>);    

            expect(wrapper.exists('#test')).toBe(true);
        });
    });

    describe('when the modal is clicked', () => {
        test('propagation is stopped', () => {
            let event = jest.fn();
            let wrapper = shallow(<Modal />);
            let content = wrapper.find('.modal-content');

            content.simulate('click', { stopPropagation: event });

            expect(event).toHaveBeenCalled();
        });
    });
});
