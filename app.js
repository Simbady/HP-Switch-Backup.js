"use strict";
const scp_Client = require('scp2');
const fs = require('fs');

const switches = JSON.parse(fs.readFileSync('switches.json', 'utf8'));

//Check if configs folder exists to save to.
fs.stat('./configs/', function(err, stat) {
  if (err === null) {
    console.log('File exists');
  } else if (err.code == 'ENOENT') {
    fs.mkdir('./configs/');
  } else {
    console.log(err);
  }
});

for (var Switch of switches) {
  getConfig(Switch);
}


function getConfig(Switch) {
  fs.stat('./configs/' + Switch + '/', function(err, stat) {
    if (err) {
      if (err.code == 'ENOENT') {
        fs.mkdir('./configs/' + Switch + '/');
      } else {
        console.log(err);
      }
    }

    scp_Client.scp({
      host: Switch,
      username: 'admin',
      password: '',
      path: '/cfg/startup-config'
    }, './configs/' + Switch + '/', function(err) {
      if (err) {
        console.log(err);
      }
    });

  });
}
