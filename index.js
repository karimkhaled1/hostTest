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
            "/",
            "*.html",
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
    let package_name=(process.env.package_name);
    let sha256_cert_fingerprints=(process.env.sha256_cert_fingerprints);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(
      [{
        "relation": [
          "delegate_permission/common.handle_all_urls",
        ],
        "target": {
          "namespace": "android_app",
          "package_name": package_name,
          "sha256_cert_fingerprints": [
            sha256_cert_fingerprints,
          ],
        },
      }]
    ));
    console.log(applicationID)

    res.end();
  });
  
  app.get("*", (req, res, next) => {
    const title = 'My Amazing Application';
    const subtitle = 'Find out more about my app...';
    const image = 'https://dashboard.render.com/static/media/logo-redesign-02-word-dark.0811da26fe4b1f9a9b6c642d91bbcf73.svg';
    let package_name=(process.env.package_name);
    const templatePath = path.join(__dirname, 'index.html');
    var source = fs.readFileSync(templatePath, { encoding: 'utf-8' })
        .replace('{{title}}', title)
        .replace('{{subtitle}}', subtitle)
        .replace('{{image}}', image)
        .replace('{{YOUR_APP_ID}}',package_name)
        .replace('{{YOUR_APP_ID}}',package_name)
        
        ;

    return res.send(source);
  });
  