var elasticsearch = require("@elastic/elasticsearch");
var client = new elasticsearch.Client({
  node: "http://localhost:9200",
});
var inputFile = require("./cities.json");
var bulkArr = [];
(async () => {
  try {
    const response = await client.indices.create({
      index: "geo_cities_point",
      body: {
        mappings: {
          properties: {
            location: {
              type: "geo_point",
            },
            name: {
              type: "text",
            },
            objectId: {
              type: "integer",
            },
            GNIS: {
              type: "integer",
            },
          },
        },
      },
    });
    console.log("geo_cities_point index status: ", response);
  } catch (e) {
    console.log("An error occurred while indexing geo_cities_point", e);
  }
  console.log("Loading Cities Data ----- ");
  try {
    let j = 1;
    for (let i in inputFile) {
      bulkArr.push(
        {
          index: { _index: "geo_cities_point", _id: j++ },
        },
        {
          name: inputFile[i].properties.NAME,
          location: inputFile[i].geometry.coordinates,
          objectId: inputFile[i].properties.OBJECTID,
          GNIS: inputFile[i].properties.GNIS,
        }
      );
    }

    const resp = client.bulk({
      index: "geo_cities_point",
      body: bulkArr,
    });
    console.log(resp);
  } catch (e) {
    console.log("Exception => " + e);
  }
})();

(async () => {})();
