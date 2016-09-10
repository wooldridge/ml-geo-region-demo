declareUpdate();
var geojson = require('/MarkLogic/geospatial/geojson');

// *** CHANGE FILE NAME TO MATCH YOUR ENV ***
var inputFilename = '/my/dir/countries.json';

var rawData = fn.head(xdmp.documentGet(inputFilename)).toObject();
for (var feature of rawData.features) {
  // replace whitespace in feature name with a dash
  var uri = '/countries/' +
    feature.properties.ADMIN.replace(/\s+/g,'-') + '.json';
  var newDoc = { envelope: {feature: feature} };
  if (feature.geometry.type === "Point") {
    newDoc.envelope.ctsPoint =
      fn.head(geojson.point(feature.geometry));
  } else if (feature.geometry.type === "MultiPolygon") {
    newDoc.envelope.ctsPoint = 'blah';
  } else {
    newDoc.envelope.ctsRegion =
      fn.head(geojson.parseGeojson(feature.geometry));
  }
  xdmp.documentInsert(
    uri, newDoc,
    xdmp.defaultPermissions(),
    ['ml-geo-region-demo', 'countries']
  );
}
