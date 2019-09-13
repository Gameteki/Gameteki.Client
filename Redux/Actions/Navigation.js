import { Constants } from '.';

export function navigate(path, search) {
    return {
        type: Constants.Navigation.Navigate,
        newPath: path,
        search: search
    };
}

export function setUrl(path) {
    return {
        type: Constants.Navigation.SetUrl,
        path: path
    };
}
