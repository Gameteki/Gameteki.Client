import React from 'react';
import { shallow } from 'enzyme';

import ApiStatus from './ApiStatus';
import AlertPanel from './AlertPanel';

describe('The AlertPanel component', () => {
    let wrapper;

    test('renders without crashing', () => {
        shallow(<ApiStatus />);
    });

    describe('when no api state passed in', () =>{
        test('nothing should be rendered', () => {
            wrapper = shallow(<ApiStatus />);

            expect(wrapper.exists('div')).toBe(false);
        });
    });

    describe('when api state is passed in', () => {
        describe('and the state is loading', () => {
            beforeEach(() => {
                wrapper = shallow(<ApiStatus apiState={ { loading: true } } />);
            });
            
            test('nothing should be rendered', () => {
                expect(wrapper.exists('div')).toBe(false);
            });
        });

        describe('and the state is not loading', () => {
            beforeEach(() => {
                wrapper = shallow(<ApiStatus apiState={ { } } />);
            });
            
            test('contorl should be rendered', () => {
                expect(wrapper.exists('div')).toBe(true);
            });
        });

        describe('and the state is success', () => {
            test('error alert should not be shown', () => {
                wrapper = shallow(<ApiStatus apiState={ { success: true } } />);

                expect(wrapper.exists(AlertPanel)).toBe(false);
            });

            describe('and the message is an object', () => {
                let listItems;

                beforeEach(() => {
                    wrapper = shallow(<ApiStatus apiState={ { success: false, message: { foo: 'foo', bar: 'bar', baz: 'bar' }} } successMessage='success' />);
                    listItems = wrapper.find('li');
                });

                test('one list item per object should be rendered', () => {
                    expect(listItems).toHaveLength(3);
                });

                test('the list items should be rendered', () => {
                    expect(listItems.at(1).text()).toBe('bar');
                });
            });
        });

        describe('and the state is not success', () => {
            let alert;

            beforeEach(() => {
                wrapper = shallow(<ApiStatus apiState={ { success: false, message: 'test'} } successMessage='success' />);
                alert = wrapper.find(AlertPanel);
            });

            test('alert should be shown', () => {
                expect(alert).not.toBeNull();
            });

            test('alert should be of type error', () => {
                expect(alert.prop('type')).toBe('error');
            });

            test('alert should show the passed in message', () => {
                expect(alert.shallow().text()).toBe(' test');
            });
            
            test('only one alert should be shown', () => {
                expect(alert).toHaveLength(1);
            });
        });

        describe('and the state is success', () => {
            let alert;

            beforeEach(() => {
                wrapper = shallow(<ApiStatus apiState={ { success: true, message: 'test'} } successMessage='success' />);
                alert = wrapper.find(AlertPanel);
            });
            
            test('alert should be shown', () => {
                expect(alert).not.toBeNull();
            });

            test('only one alert should be shown', () => {
                expect(alert).toHaveLength(1);
            });

            test('alert should be of type success', () => {
                expect(alert.prop('type')).toBe('success');
            });

            test('alert should show the passed in message', () => {
                expect(alert.shallow().text()).toBe(' success');
            });
        });

    });
});
