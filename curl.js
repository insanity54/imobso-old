var spawn = require('child_process').spawn;
var url = require('url');
var fs = require('fs');


//'curl --data "username=honkadonka&password=shinkenExpressSPAinthemiddle" http://192.168.1.200:18469/api/v1/login';
var isValidGUID = function isValidGUID(guid) {
  if (typeof guid !== 'string') return false;
  return /[a-f0-9]{40}/.test(guid.toLowerCase());
}


var login = function login(cb) {
  var curlLogin = spawn('curl', [
    '--data',
    'username='+process.env.OBAPI_USER+'&'+'password='+process.env.OBAPI_PASS,
    '--dump-header',
    'headers.txt',
    process.env.OBAPI_LOGIN_URI
  ], {
    'cwd': __dirname
  });

  curlLogin.on('close', function(code) {
    //console.log('curl login exit with '+code);
    if (code !== 0) return cb(new Error('curl couldnt login! curl err code '+code))
    return cb(null);
  });
}

// OBAPI_PROTO=http://
// OBAPI_HOST=192.168.1.200
// OBAPI_PORT=18469


var profile = function profile(guid, cb) {
  if (typeof guid === 'undefined' && typeof cb === 'undefined') throw new Error('no arguments received! minimum is 1');
  if (typeof cb === 'undefined' && typeof guid === 'function') {
    cb = guid;
    guid = '';
  }
  var endpoint;
  if (guid) {
    // validate
    if (!isValidGUID(guid)) return cb(new Error('invalid GUID'), null);
    guid = guid.toLowerCase();

    endpoint = '/api/v1/profile?guid='+guid;
  }
  else
    endpoint = '/api/v1/profile';


  var curlProfile = spawn('curl', [
    '-L', // follow redirects
    '-b', 'headers.txt', // get cookie from header file
    url.resolve(
        process.env.OBAPI_PROTO+
        process.env.OBAPI_HOST+':'+
        process.env.OBAPI_PORT,
        endpoint
      )
  ], {
    'cwd': __dirname
  });

  var d;
  curlProfile.stdout.on('data', function(data) {
    //console.log('stdout '+data);
    d = data;
  });

  curlProfile.on('close', function(code) {
    //console.log('curl login exit with '+code);
    if (code !== 0) return cb(new Error('curl couldnt login! curl err code '+code))
    return cb(null, JSON.parse(d.toString()));
  });
}


module.exports = {
  login: login,
  profile: profile,
  isValidGUID: isValidGUID
}


//
// var request = require('request');
// var url = require('url');
// //var session = {};
// var FileCookieStore = require('tough-cookie-filestore');
// var j = request.jar(new FileCookieStore('cookies.json'));
//
// //var request = request.defaults({jar: j});
//
// // log in
// if (process.argv[2] == 'login') {
//   request({
//     "method": "POST",
//     "uri": process.env.OBAPI_LOGIN_URI,
//     "json": true,
//     "body": {
//       "username": process.env.OBAPI_USER,
//       "password": process.env.OBAPI_PASS
//     },
//     "jar": j
//   })
//   .on("response", function(res) {
//     //console.log(res);
//     console.log(res.headers);
//     console.log(res.statusCode);
//     console.log(res.body);
//     //var cookie_string = j.getCookieString(uri);
//
//   })
//   .on("error", function(err) {
//     console.log(err);
//   });
// }
//
// else if (process.argv[2] == 'profile') {
//
//
//   request({
//           method: "get",
//           uri: process.env.OBAPI_PROFILE_URI
//           // qs: {
//           //     screen_name: perm_data.screen_name,
//           //     user_id: perm_data.user_id
//           // }
//       })
//       .on('response', function(response) {
//   	    //console.log(response);
//           console.log(response.statusCode); // 200
//           console.log(response.body);
//           console.log(response.headers['content-type']); // 'image/png'
//       })
//       .on('error', function(err) {
//           console.log(err);
//       });
//
// }
