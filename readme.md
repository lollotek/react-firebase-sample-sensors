# react-firebase-sample-sensors

![Sample gif](https://raw.githubusercontent.com/lollotek/react-firebase-sample-sensors/master/react-firebase-sensor.gif 
"Look Mà, IoT !!")

## Description:
This is a simple reference project to lear how to use Firebase Realtime Database.
The main porpouse is to show interaction between diffent applications, thanks to Firebase.
This sample simulate an IoT enviroment of temperature sensors array, and show it on a dashboard. It's also possible to simulate fake sensor data.

## Getting started:
* Create a Firebase project from [console](https://console.firebase.google.com/).
* Go to Console->Database->Rules and remove auth request writing following data: (WARNING: don't do it for production appplications!)
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
* Find config to [link projects to Firebase](https://firebase.google.com/docs/web/setup)
* Clone this repo or download.
* Go into single folder to start project

## Dashboard / Emulator:
Dashboard ans Emulator are based on [create-react-app](https://github.com/facebookincubator/create-react-app) 

### how to start (same for each program):
Remember to copy your Firebase config on src/index.js (repeat for each program)
```bash
cd [dashboard or sensor]
npm install
npm start
```
Then follow create-react-app instruction and get fun exploring the code

Launching second application you will notice this message:
`Something is already running on port 3000. Probably:` 
say yes (y) to to run each program.

![Dashboard Image](https://raw.githubusercontent.com/lollotek/react-firebase-sample-sensors/master/dashboard.jpg 
"Dashdoard")

![Emulator image](https://raw.githubusercontent.com/lollotek/react-firebase-sample-sensors/master/emulator.jpg 
"Emulator")


## Sensor:
This code is for [Arduino IDE](https://www.arduino.cc/en/main/software) and is tailored for [WeMos mini Board](https://wiki.wemos.cc/products:d1:d1_mini), using [DHT11 Shield](https://it.aliexpress.com/store/product/DHT-Shield-for-WeMos-D1-mini-DHT11-Single-bus-digital-temperature-and-humidity-sensor-module-sensor/1331105_32534235492.html?spm=2114.12010612.0.0.lRsBiA).

Before start remember to add [Arduino core for ESP8266 WiFi chip](https://github.com/esp8266/Arduino) into your Arduino IDE config.

Other libraryes could be  necessary, install using Arduino Library Manager.
Based on [firebase-arduino](https://github.com/firebase/firebase-arduino), it need config:

```
FIREBASE_HOST "<Firebase host setting>"
FIREBASE_AUTH "<database code>"
WIFI_SSID "<WiFi Name>"
WIFI_PASSWORD "<your WiFi password>"
```

how to find database code :

- Click on the settings/cog wheel icon next to your project name at the top of the new Firebase Console
- Click Project settings
- Click on the Service Account tab
- Click on the Database Secrets link in the inner left-nav
- Hover over the non-displayed secret and click Show

`Warning:` this method could change, check [issue 224](https://github.com/firebase/firebase-arduino/issues/224) and [issue 265](https://github.com/firebase/firebase-arduino/issues/265)

# Security warning:
This project doesn't cover security management and require an unauthorized read and write privileges.
`USE ONLY FOR STUDY POURPOSE!` or add auth level.