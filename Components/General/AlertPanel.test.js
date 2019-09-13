import React from 'react';
import { shallow } from 'enzyme';

import AlertPanel from './AlertPanel';

describe('The AlertPanel component', () => {
    let wrapper;

    test('renders without crashing', () => {
        shallow(<AlertPanel />);
    });

    describe('title', () => {
        describe('when set', () => {
            test('the title should be rendered', () => {
                wrapper = shallow(<AlertPanel title='Test title' />);
    
                let title = wrapper.find('#alert-title');
    
                expect(title.text()).toBe('Test title');
            });
        });
    
        describe('when not set', () => {
            test('the title should not be rendered', () => {
                wrapper = shallow(<AlertPanel />);    
   
                expect(wrapper.exists('#alert-title')).toBe(false);
            });
        });
    });

    describe('message', () => {
        describe('when set', () => {
            test('the message should be rendered', () => {
                wrapper = shallow(<AlertPanel message='Test message' />);
    
                let message = wrapper.find('#alert-message');
    
                expect(message.text().trim()).toBe('Test message');
            });
        });
    
        describe('when not set', () => {
            test('the message should not be rendered', () => {
                wrapper = shallow(<AlertPanel />);
    
                expect(wrapper.exists('#alert-message')).toBe(false);
            });
        });    
    });

    describe('alert type', () => {
        describe('when set to error', () => {
            beforeEach(() => {
                wrapper = shallow(<AlertPanel type='error' />);
            });
    
            test('should render a danger alert', () => {
                expect(wrapper.hasClass('alert-danger')).toBe(true);
            });
                
            test('should render an error icon', () => {
                expect(wrapper.exists('.glyphicon-exclamation-sign')).toBe(true);
            });
        });
    
        describe('when set to warning', () => {
            beforeEach(() => {
                wrapper = shallow(<AlertPanel type='warning' />);
            });
    
            test('should render a warning alert', () => {
                expect(wrapper.hasClass('alert-warning')).toBe(true);
            });
                
            test('should render a warning icon', () => {
                expect(wrapper.exists('.glyphicon-warning-sign')).toBe(true);
            });
        });
    
        describe('when set to info', () => {
            beforeEach(() => {
                wrapper = shallow(<AlertPanel type='info' />);
            });
    
            test('should render an info alert', () => {
                expect(wrapper.hasClass('alert-info')).toBe(true);
            });
                
            test('should render an info icon', () => {
                expect(wrapper.exists('.glyphicon-info-sign')).toBe(true);
            });
        });
    
        describe('when set to success', () => {
            beforeEach(() => {
                wrapper = shallow(<AlertPanel type='success' />);
            });
    
            test('should render a success alert', () => {
                expect(wrapper.hasClass('alert-success')).toBe(true);
            });
                
            test('should render a success icon', () => {
                expect(wrapper.exists('.glyphicon-ok-sign')).toBe(true);
            });
        });
    
        describe('when not set', () => {
            beforeEach(() => {
                wrapper = shallow(<AlertPanel />);
            });
    
            test('should render an info alert', () => {
                expect(wrapper.hasClass('alert-info')).toBe(true);
            });
                
            test('should render an info icon', () => {
                expect(wrapper.exists('.glyphicon-info-sign')).toBe(true);
            });
        });    
    });

    describe('noIcon', () => {
        describe('when set', () => {
            test('no icon should be rendered', () => {
                wrapper = shallow(<AlertPanel noIcon />);    
       
                expect(wrapper.exists('#alert-icon')).toBe(false);
            });
        });

        describe('when not set', () => {
            test('an icon should be rendered', () => {
                wrapper = shallow(<AlertPanel />);    
       
                expect(wrapper.exists('#alert-icon')).toBe(true);
            });
        });
    });

    describe('multiLine', () => {
        beforeEach(() => {
            wrapper = shallow(<AlertPanel title='Test title' />);
        });

        describe('when set', () => {
            test('the multiline class should appear', () => {
                wrapper = shallow(<AlertPanel multiLine />);    

                expect(wrapper.exists('.multiline')).toBe(true);
            });
        });

        describe('when not set', () => {
            test('the multiline class should not appear', () => {
                expect(wrapper.exists('.multiline')).toBe(false);
            });
        });
    });
    
    describe('when children are passed in', () => {
        test('the children are rendered', () => {
            wrapper = shallow(<AlertPanel><div id='test'>This is a test</div></AlertPanel>);    

            expect(wrapper.exists('#test')).toBe(true);
        });
    });
});
