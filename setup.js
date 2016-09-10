var config = require('./config'),
    rp = require('request-promise'),
    fs = require('fs');

function createDatabase() {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/manage/v2/databases',
    body: config.databaseSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Database created: ' + config.databaseSetup["database-name"]);
      getHost();
    })
    .catch(function (err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

var hostName = '';

function getHost() {
  var options = {
    method: 'GET',
    uri: 'http://' + config.host + ':8002/manage/v2/hosts',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      hostName = parsedBody['host-default-list']['list-items']['list-item'][0].nameref;
      console.log('Host name: ' + hostName);
      createForest(hostName);
    })
    .catch(function (err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

function createForest(hostName) {
  config.forestSetup["host"] = hostName;
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/manage/v2/forests',
    body: config.forestSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Forest created and attached: ' + config.forestSetup["forest-name"]);
      createREST();
    })
    .catch(function (err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

function createREST() {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/v1/rest-apis',
    body: config.restSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('REST instance created at port: ' + config.restSetup["rest-api"]["port"]);
      //createOptions();
      loadData();
    })
    .catch(function (err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

var dataPath = config.path + 'docs/'
    dataFiles = fs.readdirSync(dataPath),
    count = 0;

function loadData() {
  var currFile = dataFiles.shift();
  count++;
  var buffer;
  buffer = fs.readFileSync(dataPath + currFile);

  var options = {
    method: 'PUT',
    uri: 'http://' + config.host + ':' + config.restSetup["rest-api"]["port"] + '/v1/documents?database=' + config.databaseSetup["database-name"] + '&uri=/' + currFile + '&collection=docs',
    body: buffer,
    auth: config.auth
  };
  rp(options)
    .then(function (parsedBody) {
      console.log('Document loaded: ' + currFile);
      if (dataFiles.length > 0) {
        loadData();
      } else {
        console.log('Data loaded');
      }
    })
    .catch(function (err) {
      console.log(JSON.stringify(err, null, 2));
    });
}

function start() {
  createDatabase();
}

start();
