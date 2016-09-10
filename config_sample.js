var config = {};

config.path = "/PATH/TO/ml-geo-regions/"; // include trailing "/"

config.host = "localhost";

config.server = {
  "port": 8563
};

config.database = {
  "name": "ml-geo-regions",
  "port": 8562
};

config.auth = {
  user: 'USERNAME',
  pass: 'PASSWORD',
  sendImmediately: false
};

config.databaseSetup = {
  "database-name": config.database.name,
  "geospatial-region-path-index": [
    {
      "path-expression": "/region",
      "coordinate-system": "wgs84",
      "geohash-precision": "3",
      "invalid-values": "ignore"
    }
  ],
  "geospatial-element-pair-index": [
    {
      "parent-namespace-uri": "",
      "parent-localname": "point",
      "latitude-namespace-uri": "",
      "latitude-localname": "latitude",
      "longitude-namespace-uri": "",
      "longitude-localname": "longitude",
      "coordinate-system": "wgs84",
      "range-value-positions": false,
      "invalid-values": "ignore"
   }
  ]
};

config.forestSetup = {
  "forest-name": config.database.name + '-1',
  "database": config.database.name
}

config.restSetup = {
  "rest-api": {
    "name": config.database.name + "-rest",
    "database": config.database.name,
    "modules-database": config.database.name + "-modules",
    "port": config.database.port,
    "error-format": "json"
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}
