const request = require("request");

const forecast = (latitude, longuitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5780d0fbe69bfb06a09705e61bdd6be4&query=" +
    latitude +
    "," +
    longuitude +
    "&units=f";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        region: body.location.name,
        feelslike: body.current.feelslike,
        precipitation: body.current.precip,
      });
    }
  });
};

module.exports = forecast;
