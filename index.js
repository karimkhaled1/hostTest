const express = require('express')
const path= require('path')
require('dotenv').config({path: './.env'});

const fs= require('fs')
const app = express()
const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




app.get("/.well-known/apple-app-site-association", (req, res) => {
    let teamId=(process.env.teamId);
    let applicationPackage=(process.env.applicationID);
    let applicationID = `${teamId}.${applicationPackage}`;
  
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify({
      "applinks": {
        "apps": [],
        "details": [{
          "appID": applicationID,
          "paths": [
            "/login",
            "/properties-rent-collection-payment",
          ],
        }],
      },
      "webcredentials": {
        "apps": [
          applicationID,
        ],
      },
    }));
    console.log(applicationID)
    res.end();
  });
  
  app.get("/.well-known/assetlinks.json", (req, res) => {
    let YOUR_PACKAGE_NAME=(process.env.YOUR_PACKAGE_NAME);
    let sha256_cert_fingerprints=(process.env.sha256_cert_fingerprints);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(
      [{
        "relation": [
          "delegate_permission/common.handle_all_urls",
        ],
        "target": {
          "namespace": "android_app",
          "package_name": YOUR_PACKAGE_NAME,
          "sha256_cert_fingerprints": [
            sha256_cert_fingerprints,
          ],
        },
      }]
    ));
    console.log(applicationID)

    res.end(YOUR_PACKAGE_NAME);
  });
  
  app.get("*", (req, res, next) => {
    // Define values
    const title = "My Amazing Application";
    const subtitle = "Find out more about my app...";
    const image = "https://.../your-app-banner.jpg";
  
    // Load HTML template
    const templatePath = path.join(__dirname, "./index.html");
    console.log(templatePath);
    // Replace handles with content
    // const source = fs.readFileSync(templatePath, {encoding: "utf-8"})
    //   .replaceAll("{{title}}", title)
    //   .replaceAll("{{subtitle}}", subtitle)
    //   .replaceAll("{{image}}", image);

    // Return the webpage
    return res.send("<p> test</p>");
  });
  