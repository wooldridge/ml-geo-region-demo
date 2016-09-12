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

// Get spatial relation from command line
var relation = process.argv[2] || 'intersects';

// Define a search polygon
var ml_neighborhood = q.polygon(
  [37.519087, -122.26346],
  [37.521299, -122.24805],
  [37.512279, -122.24462],
  [37.50336,  -122.24556],
  [37.506185, -122.25981],
  [37.513436, -122.26337],
  [37.519087, -122.26346]
);

db.documents.query(
  q.where(
    q.geospatialRegion(
      q.geoPath('/envelope/ctsRegion'),
      relation,
      ml_neighborhood
    )
  )
).result(function(result) {
    for (var r of result) {
      console.log(r.uri);
    }
  },
  function(error) {
    console.log(JSON.stringify(error, null, 2));
  });
