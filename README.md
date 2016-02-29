[![Dependency Status](https://david-dm.org/simbady/HP-Switch-Backup.js.svg)](https://david-dm.org/simbady/HP-Switch-Backup.js)
# HP-Switch-Backup.js
Node.js application to backup HP Procurve Switches through SSH.
These backups are stored in a folder structure as such
./configs/SwitchName/startup-config

### Usage
Git clone the repo into your desired folder, and run a
```npm install```
and then
```npm start``` to run.

### Switch Setup

The switch by default will have SSH and SCP disabled, to enable these open up the command line on the switch, enter config mode and run:
```
crypto key generate ssh  
ip ssh
ip ssh filetransfer
write memory  
```

You may also want to disable non-secure and SFTP communication by running.
```
no telnet-server  
no sftp server  
no sftp client  
write memory  
```

### Config
You must add the switches you would like to be backed up to the switches.json file. For each switch we require a host, username and password. Remember these passwords are stored in plain text so ensure that it is not a public facing file.
The JSON format is as follows.
```
[
    {
      "host": "192.168.1.1",
      "username": "manager",
      "password": ""
    },
    {
      "host": "192.168.1.2",
      "username": "manager",
      "password": ""
    }
]
```
