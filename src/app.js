const path = require("path");
const express = require("express");
const geoCode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public/");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Daniel Abdala",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message:
      "Contact Us for any questions and/or concerns. We are here to help!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longuitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      } else {
        forecast(
          latitude,
          longuitude,
          (error, { temperature, region, feelslike, precipitation }) => {
            if (error) {
              return res.send({
                error: error,
              });
            } else {
              res.send({
                Location: location,
                Temperature: temperature,
                Precipitation: precipitation,
              });
            }
          }
        );
      }
    }
  );
});

// app.get("/products", (req, res) => {
//   console.log(req.query.search);

//   if (!req.query.address) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   res.send({
//     products: [],
//   });
// });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
