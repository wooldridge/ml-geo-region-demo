# Loading Data

Based on example here:

http://pubs.marklogic.com:8011/9.0/guide/search-dev/geospatial#id_21163

Country data is from here:

https://github.com/datasets/geo-countries/

## Load Documents

Paste loadJSON.js into QConsole:

http://localhost:8000/qconsole/

Set inputFilename path to path for countries.json.

Run JavaScript code to load countries as separate documents.

## Create Indexes

Paste createIndexes.js into QConsole:

http://localhost:8000/qconsole/

Run JavaScript code to create geospatial indexes for the documents.
