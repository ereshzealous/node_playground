var elasticsearch = require("@elastic/elasticsearch");
var client = new elasticsearch.Client({
  node: "http://localhost:9200",
});
var inputFile = require("./countys.json");
var bulkArr = [];

(async () => {
  try {
    const response = await client.indices.create({
      index: "geo_cities_shapes",
      body: {
        mappings: {
          properties: {
            location: {
              type: "geo_shape",
            },
            name: {
              type: "text",
            },
          },
        },
      },
    });
    console.log("geo_cities_shapes index status: ", response);
  } catch (e) {
    console.log("An error occurred while indexing location", e);
  }
  try {
    let j = 1;
    for (let i in inputFile) {
      bulkArr.push(
        {
          index: { _index: "geo_cities_shapes", _id: j++ },
        },
        {
          name: inputFile[i].properties.NAME,
          location: inputFile[i].geometry,
        }
      );
    }

    const resp = client.bulk({
      index: "geo_cities_shapes",
      body: bulkArr,
    });
    console.log(resp);
  } catch (e) {
    console.log("Exception => " + e);
  }
})();
