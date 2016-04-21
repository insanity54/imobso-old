var request = require('request');

request({
        user: process.env.OBAPI_USER,
        pass: process.env.OBAPI_PASS,
        method: "get",
        uri: process.env.OBAPI_URI,
        // qs: {
        //     screen_name: perm_data.screen_name,
        //     user_id: perm_data.user_id
        // }
    })
    .on('response', function(response) {
        console.log(response.statusCode); // 200 
        console.log(response.headers['content-type']); // 'image/png' 
    })
    .on('error', function(err) {
        console.log(err);
    });
