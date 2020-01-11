function request(method) {
    const getAuthHeader = () => {
        const token = window.localStorage.getItem('auth_token');

        return (token && token.length)
            ? { 'Authorization': `Bearer ${token}` }
            : {}
    }

    return async (url, data, options) => {
        const authHeader = getAuthHeader();

        return await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...authHeader
            },
            body: data !== undefined && Object.keys(data).length
                    ? JSON.stringify(data)
                    : undefined,
            ...options
        })
        .then(response => {
            return response.text()
                .then(text => {
                    const data = text && JSON.parse(text);

                    if (!response.ok) {
                        if (response.status === 401) {
                            window.localStorage.removeItem('auth_token');
                            window.location.reload(true);
                        }
            
                        const error = (data && data.errors) || response.statusText;
                        return Promise.reject(error);
                    }

                    return Promise.resolve(data);
                });
        });
    }
}

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const remove = request('delete');