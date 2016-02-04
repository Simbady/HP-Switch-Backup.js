"use strict";

//Dependancies
const scp_Client = require('scp2');
const fs = require('fs');

//Get Switches from File
const switches = JSON.parse(fs.readFileSync('switches.json', 'utf8'));

//Check if configs folder exists to save to.
fs.stat('./configs/', function(err, stat) {
  if (err === null) {
  } else if (err.code == 'ENOENT') {
    fs.mkdir('./configs/');
  } else {
    console.log(err);
  }
});

// Loop over switches in switches.json
for (var i = 0; i < switches.length; i++) {
  getConfig(switches[i]);
}

//Check if folders exists for switch to save data into then get/save data.
function getConfig(Switch) {
  fs.stat('./configs/' + Switch.host + '/', function(err, stat) {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.mkdir('./configs/' + Switch.host + '/');
      } else {
        console.log(err);
      }
    }

    scp_Client.scp({
      host: Switch.host,
      username: Switch.username,
      password: Switch.password,
      path: '/cfg/startup-config'
    }, './configs/' + Switch.host + '/', function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
}
