import React from 'react';
import { shallow } from 'enzyme';

import Panel from './Panel';

describe('The Panel component', () => {
    let wrapper;

    test('renders without crashing', () => {
        shallow(<Panel />);
    });

    describe('title', () => {
        describe('when set', () => {
            test('the title should be rendered', () => {
                wrapper = shallow(<Panel title='Test title' />);
    
                let title = wrapper.find('.panel-heading');
    
                expect(title.text()).toBe('Test title');
            });
        });
    
        describe('when not set', () => {
            test('the title should not be rendered', () => {
                wrapper = shallow(<Panel />);    
   
                expect(wrapper.exists('#alert-title')).toBe(false);
            });
        });
    });

    describe('panel type', () => {
        describe('when set to danger', () => {
            beforeEach(() => {
                wrapper = shallow(<Panel type='danger' />);
            });
    
            test('should render an danger panel', () => {
                expect(wrapper.hasClass('panel-danger')).toBe(true);
            });
        });
    
        describe('when set to warning', () => {
            beforeEach(() => {
                wrapper = shallow(<Panel type='warning' />);
            });
    
            test('should render a warning panel', () => {
                expect(wrapper.hasClass('panel-warning')).toBe(true);
            });                
        });
    
        describe('when set to info', () => {
            beforeEach(() => {
                wrapper = shallow(<Panel type='info' />);
            });
    
            test('should render an info panel', () => {
                expect(wrapper.hasClass('panel-info')).toBe(true);
            });                
        });
    
        describe('when set to success', () => {
            beforeEach(() => {
                wrapper = shallow(<Panel type='success' />);
            });
    
            test('should render a success panel', () => {
                expect(wrapper.hasClass('panel-success')).toBe(true);
            });                
        });
    
        describe('when not set', () => {
            beforeEach(() => {
                wrapper = shallow(<Panel />);
            });
    
            test('should render a primary panel', () => {
                expect(wrapper.hasClass('panel-primary')).toBe(true);
            });
        });    
    });

    describe('when children are passed in', () => {
        test('the children are rendered', () => {
            wrapper = shallow(<Panel><div id='test'>This is a test</div></Panel>);    

            expect(wrapper.exists('#test')).toBe(true);
        });
    });
});
