const axios = require('axios');

axios('http://127.0.0.1:19000/api_user/user/auth', {
    method: 'GET',
    data: {
        s: 1
    }
})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.message);
    });
