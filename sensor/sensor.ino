#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

// Set these to run example.
FIREBASE_HOST "<Firebase host setting>"
FIREBASE_AUTH "<database code>"
WIFI_SSID "<WiFi Name>"
WIFI_PASSWORD "<your WiFi password>"

String macaddress;


#include "DHT.h"
#define DHTPIN D4     // what pin we're connected to
#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);

float prevt = 0;

void setup() {
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  macaddress = WiFi.macAddress();
  Serial.print("macaddress ");
  Serial.println(macaddress);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  dht.begin();
}

void loop() {

  //float h = dht.readHumidity(); // you could also mange humidity
  float t = dht.readTemperature();
  if (isnan(t)) {
    Serial.println("Error reading from sensor");
    return;
  }
  
  // Serial debugging values
  //Serial.print("Humidity: ");
  //Serial.println(h);
  Serial.print("Temperature: ");
  Serial.println(t);

  // set value
  Firebase.setFloat("sensors/" + macaddress, t);
  // handle error
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
  
  delay(1000); // check every second
}
