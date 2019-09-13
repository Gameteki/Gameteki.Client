import { navigate, setUrl, Constants } from '.';

describe('Navigation actions', () => {
    describe('navigate', () => {
        describe('when called with a path', () => {
            test('a navigation action with the path set should be returned', () => {
                let ret = navigate('/path');

                expect(ret.type).toBe(Constants.Navigation.Navigate);
                expect(ret.newPath).toBe('/path');
            });
        });

        describe('when called with a search action', () => {
            test('a navigation action with the search action set should be returned', () => {
                let ret = navigate(undefined, 'search');

                expect(ret.type).toBe(Constants.Navigation.Navigate);
                expect(ret.search).toBe('search');
            });
        });
    });

    describe('setUrl', () => {
        describe('when called with a url', () => {
            test('a set url action with the url should be returned', () => {
                let ret = setUrl('/path');

                expect(ret.type).toBe(Constants.Navigation.SetUrl);
                expect(ret.path).toBe('/path');
            });
        });
    });
});
