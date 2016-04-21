var request = require('request');
var url = require('url');
var session = {};

// log in

request({
	"method": "post",
  "uri": process.env.OBAPI_LOGIN_URI,
	"json": true,
	"body": {
		"username": process.env.OBAPI_USER,
		"password": process.env.OBAPI_PASS
	}
})
.on("response", function(res) {
	console.log(res);
	console.log(res.statusCode);
	console.log(res.body);
})
.on("error", function(err) {
	console.log(err);
});

//
// request({
//         method: "get",
//         uri: process.env.OBAPI_URI
//         // qs: {
//         //     screen_name: perm_data.screen_name,
//         //     user_id: perm_data.user_id
//         // }
//     })
//     .on('response', function(response) {
// 	    console.log(response);
//         console.log(response.statusCode); // 200
//         console.log(response.headers['content-type']); // 'image/png'
//     })
//     .on('error', function(err) {
//         console.log(err);
//     });
