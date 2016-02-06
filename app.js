"use strict";

//Dependancies
const scp_Client = require('scp2');
const fs = require('fs');
const email = require('./email.js');

//Get Switches from File
const switches = JSON.parse(fs.readFileSync('switches.json', 'utf8'));
//Initialise Counter
let Count = 0;
let Results = [];
//Check if configs folder exists to save to.
fs.stat('./configs/', function(err, stat) {
  if (err === null) {} else if (err.code == 'ENOENT') {
    fs.mkdir('./configs/');
  } else {
    console.log(err);
  }
});

// Loop over switches in switches.json
switches.forEach(function(Switch) {
  getConfig(Switch);
});

//Check if folders exists for switch to save data into then get/save data.
function getConfig(Switch) {
  fs.stat('./configs/' + Switch.host + '/', function(err, stat) {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.mkdir('./configs/' + Switch.host + '/');
      } else {
        console.log(Switch.host + err);
      }
    }

    scp_Client.scp({
      host: Switch.host,
      username: Switch.username,
      password: Switch.password,
      path: '/cfg/startup-config'
    }, './configs/' + Switch.host + '/', function(err) {
      if (err) {
        console.log(Switch.host + err);
        count(Switch.host + err);
      } else {
        console.log(Switch.host + " Backed up.");
        count(Switch.host + " Backed up.");
      }
    });
  });
}

function count(result) {
  Count++;
  Results.push(result);
  Results.push("<br>");
  if (Count == switches.length) {
    email.SendEmail(Results, function(){
        console.log('Finished');
        process.exit(0);
    });
}
}
