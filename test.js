var config = require('./config'),
    marklogic = require('marklogic');

var db = marklogic.createDatabaseClient({
  host: config.host,
  port: config.database.port,
  user: config.auth.user,
  password: config.auth.pass,
  authType: 'digest'
});

var q = marklogic.queryBuilder;

var poly = q.polygon(
  [12.5210, -69.9684],
  [12.5212, -69.9684],
  [12.5212, -69.9682],
  [12.5210, -69.9682]
);

var point = q.point(
  26.2285, 50.5860
);

//25.2744° S, 133.7751
//
//12.5092° N, 70.0086

//12.5211° -69.9683°
//
////40.1792° N, 44.4991° E
///
///26.2285° N, 50.5860

var whereClause = q.geospatialRegion(
      q.geoPath('/envelope/ctsRegion'),
      'intersects',
      point
    );

db.documents.query(
  q.where(whereClause)
  .withOptions({"debug": true})
).result(function(result) {
    console.log(JSON.stringify(result[0], null, 2));
    //console.log(JSON.stringify(result[0].content.envelope.feature.properties, null, 2));
  },
  function(error) {
    console.log(JSON.stringify(error, null, 2));
  });
