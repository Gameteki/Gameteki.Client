import { Constants } from '.';

export function navigate(path, search = '', noHistory = false) {
    return {
        type: Constants.Navigation.Navigate,
        newPath: path,
        search: search,
        noHistory: noHistory
    };
}

export function setUrl(path) {
    return {
        type: Constants.Navigation.SetUrl,
        path: path
    };
}
