# ml-geo-region-demo

Demo of geospatial region search

## Requirements

- MarkLogic 9
- Node.js

## To Run

```git clone https://github.com/wooldridge/ml-geo-region-demo```

```cd ml-geo-region-demo```

```npm install```

Copy `config_sample.js` to `config.js` and edit `config.js` for your setup (path, user, password, etc.).

```node setup```

To undo setup from root directory: `node teardown`

Run region query:

```node test.js <relation>```

Where `<relation>` is: equals|disjoint|touches|contains|covers|intersects|within|covered-by|crosses|overlaps
