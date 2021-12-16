const requestUrl = 'http://localhost:5000';

export const makeRequest = (method, uri, user, header) => {
    return  fetch(requestUrl + uri, {
        headers: {
            "Content-Type": 'application/json',
            'Authorization': header,
        },
        method,
        body: user,
    });
};

export const makePostRequest = (method, uri, data, header) => {
    return  fetch(requestUrl + uri, {
        method,
        body: data,
    });
}
