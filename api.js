var app = require('./index');
var curl = require('./curl');



//if (typeof req._infra === 'undefined') req._infra = {};
var setup = function setup(req, res, next) {
  if (typeof req._imobso === 'undefined') req._imobso = {};
  return next();
};

var getReqParams = function getReqParams(req, res, next) {
  //console.log(req.params);
  if (typeof req._imobso === 'undefined') throw new Error('_imobso was not defined');
  if (typeof req.params.guid !== 'undefined')
    req._imobso.guid = req.params.guid;
  return next();
};

var getOnlineStatus = function getOnlineStatus(req, res, next) {
  if (typeof req._imobso === 'undefined') throw new Error('_imobso was not defined');
  if (typeof req._imobso.guid === 'undefined') return next(new Error('guid was not defined'));
  curl.profile(req._imobso.guid, function(err, prof) {
    if (err) return res.status(400).json({"error": err.toString()});
    //console.log(prof);
    if (typeof prof.profile === 'undefined') req._imobso.online = false;
    else {
      req._imobso.online = true;
      req._imobso.short_description = prof.profile.short_description
    }
    return next();
  });
}

var returnOnlineStatus = function returnOnlineStatus(req, res, next) {
  //console.log(req);
  if (typeof req._imobso === 'undefined') throw new Error('_imobso was not defined');
  res.set({'Content-Type': 'application/json'});
  if (req._imobso.online) return res.status(200).json({"online": true, "short_description": req._imobso.short_description});
  res.status(400).json({"online": false});
}


app.get('/api/v1/online/:guid',
  setup,
  getReqParams,
  getOnlineStatus,
  returnOnlineStatus
);
