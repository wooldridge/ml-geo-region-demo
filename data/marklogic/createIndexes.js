var admin = require('/MarkLogic/admin');

var database = 'ml-geo-region-demo';
var config = admin.getConfiguration();

// Point index over the JSON samples
config = admin.databaseAddGeospatialPathIndex(
    config, admin.databaseGetId(config, database),
    admin.databaseGeospatialPathIndex(
      '/envelope/ctsPoint', 'wgs84', false, 'point', 'reject')
  );

// Region index over the JSON samples
config = admin.databaseAddGeospatialRegionPathIndex(
    config, admin.databaseGetId(config, database),
    admin.databaseGeospatialRegionPathIndex(
      '/envelope/ctsRegion', 'wgs84', 10, 'reject')
  );

// Create the configured indexes.
admin.saveConfiguration(config);
