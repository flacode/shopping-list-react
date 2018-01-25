let token = ''
window.client = (function () {
    // success function that will be called on success
    getShoppingLists = (success) => {
        const url = 'http://127.0.0.1:5000/api/shoppinglist/'
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        }).then(checkStatus)
          .then(success)
    }

    checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300){
            token = response.access_token
            return response
        }
    }

    return {
        getShoppingLists,
    };
}());