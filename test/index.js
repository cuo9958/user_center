const axios = require('axios');

axios('http://127.0.0.1:19000/api_user/auth?a=1', {
    method: 'POST',
    data: {
        s: 1
    }
}).catch(err => {
    console.log(err.message);
});
