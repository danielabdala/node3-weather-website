const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWJkYWxhZCIsImEiOiJja3J1eTNtc3YwMWI3Mm5rM3B0Mzc2cW1hIn0.u6r6pZWGxhRhFnYwr_6hJA&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longuitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
