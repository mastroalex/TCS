# Web server for ESP 8266 

Table of contents:
* [Introduction](#introduction)
  * [Add new sensor data](#add-new-sensor-data)
  * [Code comments](#code-comments)
      - [Web page building](#web-page-building)
      - [HTML Body](#html-body)
      - [Automatic updates](#automatic-updates)
      - [Processor](#processor)
  * [Complete code](#complete-code)

## Introduction 

As indicated in the main file:

The web server can be accessed with any device that has a browser on your local network.
This is an asynchronous web server that update data automatically without need to refresh the web page and with custom CSS to style the web page.

<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266webserveinfo/webserver_example.png" alt="system" width="700"/>

> DS18B20 hand held to see the difference

Install the DHT library bi Adafruit.

Follow the next step to install the ESPAsyncWebServer library:
1. [Download AsyncWebServer library](https://github.com/me-no-dev/ESPAsyncWebServer/archive/master.zip)
2. Unzip the .zip folder
3. Rename your folder from ~~ESPAsyncWebServer-master~~ to ESPAsyncWebServer
4. Move the ESPAsyncWebServer folder to your Arduino IDE installation libraries folder

Follow the next step to install the ESPAsync TCP Library:
1. [Download ESPAsync TCP library](https://github.com/me-no-dev/ESPAsyncWebServer/archive/master.zip)
2. Unzip
3. Rename your folder from ~~ESPAsyncTCP-master~~ to ESPAsyncTCP
4. Move the ESPAsyncTCP folder to your Arduino IDE installation libraries folder
Restard Arduino IDE.

The example code is presented in [esp8266_weserver.ino](https://github.com/mastroalex/tempcontrol/blob/main/esp8266webserveinfo/esp8266_webserver/esp8266_webserver.ino)

Insert wifi credentials!
```c
const char* ssid = "REPLACE_WITH_YOUR_SSID";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";
```


## Add new sensor data

Create variabile for data reading and update it in `loop()`

```c
float data = 0;
```
Ad paragraph and placeholder into HTML section:
```html
 <p>
    <i class="fas fa-temperature-high" style="color:#b32d00;"></i> 
    <span class="dht-labels">Data</span> 
    <span id="dataid">%DATA%</span>
    <sup class="units">&deg;C</sup>
  </p>
```

Ad section into `<script>` block for the placeholder:
```js
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("dataid").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/data", true);
  xhttp.send();
}, 10000) ;
```

Ad `else if` section into processor():
```c
else if (var == "DATA") { // DHT humidity
    return String(data);
  }
```

Another options is to obtain sensor data with a specially created function and update it in this last section taking its data as a string. Suppose this function called `specialfunction()` this last paragraph would be:

```c
else if (var == "DATA") { // DHT humidity
    return String(specialfunction());
  }
```



## Code comments 

For the code part and the variables that refer to a particular sensor look in the [reading examples folder](https://github.com/mastroalex/tempcontrol/tree/main/esp8266_sensor_reading).

Create an AsyncWebServerobject on port 80.
```c
AsyncWebServer server(80);
```
#### Web page building
The webpage include heading and differents paragraph to display sensor data.There are also two icons to style the page.

All the HTML text with styles included is stored in the index_html variable. Now we’ll go through the HTML text and see what each part does.

<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266webserveinfo/webserver.png" alt="system" width="850"/>


The following `<meta>` tag makes your web page responsive in any browser.
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

The `<link>` tag is needed to load the icons from the fontawesome website.
```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
```

Between the `<style></style>` tags there is some CSS.
Text centered:
```css
html {
  font-family: Arial;
  display: inline-block;
  margin: 0px auto;
  text-align: center;
}
```

Labels styled:
```css
dht-labels{
  font-size: 1.5rem;
  vertical-align:middle;
  padding-bottom: 15px;
}
```
#### HTML Body
Inside the `<body></body>` tags there is the web page content.
The `<h2></h2>` tags add a heading.
There are different paragraph, one for each sensor.
Example for temperature:
```html
<p>
  <i class="fas fa-thermometer-half" style="color:#059e8a;"</i> 
  <span class="dht-labels">Temperature</span> 
  <span id="temperature">%TEMPERATURE%</span>
  <sup class="units">°C</sup>
</p>
```

The `<i>` tags display the fontawesome icons. To display different icon go to [Font Awesome Icon website](https://fontawesome.com/icons?d=gallery) and select the icon you’re looking for. Copy the HTML text provided.
```html
<i class="fas fa-adjust"></i>
``` 
It's possibile also to change color, in hexadecimal.
```html
<i class="fas fa-adjus" style="color:#00add6;"></i> 
``` 
The TEMPERATURE text between % signs is a placeholder for the temperature value. This means that this `%TEMPERATURE%` text is like a variable that will be replaced by the actual temperature value from the DHT sensor. The placeholders on the HTML text should go between % signs.
```html
<span id="temperature">%TEMPERATURE%</span>
``` 
#### Automatic updates
For automatic updates ther's some JavaScript code in our web page that updates the temperature and humidity automatically, every 10 seconds. Scripts in HTML text should go between the `<script></script>` tags.
FExample for temperature:
```js
<script>
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("temperature").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/temperature", true);
  xhttp.send();
}, 10000 ) ;
``` 

To update data on the background, there is a setInterval() function that runs every 10 seconds.
Basically, it makes a request in the `/data` URL to get the latest `data`:
```js
  xhttp.open("GET", "/data", true);
  xhttp.send();
}, 10000 ) ;
```
When it receives that value, it updates the HTML element whose id is data.
```js
if (this.readyState == 4 && this.status == 200) {
  document.getElementById("temperature").innerHTML = this.responseText;
}
```
#### Processor
Another important function is `processor()` function, that will replace the placeholders in our HTML text with the actual temperature and humidity values.
```c
String processor(const String& var){
  //Serial.println(var);
  if(var == "TEMPERATURE"){
    return String(t);
  }
  else if(var == "DATA"){
    return String(data);
  }
  return String();
}
```
When the web page is requested, we check if the HTML has any placeholders. If it finds the `%DATA%` placeholder, we return the temperature that is stored on the data variable.

In `setup()` there are different initializations. 
Connection to your local network and print the ESP8266 IP address:
```c
WiFi.begin(ssid, password);
while (WiFi.status() != WL_CONNECTED) {
  delay(1000);
  Serial.println("Connecting to WiFi..");
}
```

And the code to handle the web server.
When we make a request on the root URL, we send the HTML text that is stored on the `index_html` variable. We also need to pass the `processor` function, that will replace all the placeholders with the right values.
```c
server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send_P(200, "text/html", index_html, processor);
});
```

Add additional handlers to update the temperature and humidity readings. When we receive a request on the `/data` URL, we simply need to send the updated temperature value. It is plain text, and it should be sent as a char, so, we use the `c_str()` method.

```c
server.on("/data", HTTP_GET, [](AsyncWebServerRequest *request){
  request->send_P(200, "text/plain", String(data).c_str());
});
```

Start webserver
```c
server.begin();
```

It is recommended to print the sensor data on the serial monitor through the `loop()` for a debug function.


## Complete code
```
// Import required libraries
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Hash.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
// Library for DHT sensor
#include <Adafruit_Sensor.h>
#include <DHT.h>
// Library for DS18B20 Sensor
#include <OneWire.h>
#include <DallasTemperature.h>

// Replace with your network credentials
const char* ssid = "REPLACE_WITH_YOUR_SSID";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";

#define DHTPIN D3     // Digital pin connected to the DHT sensor

// Uncomment the type of sensor in use:
#define DHTTYPE    DHT11     // DHT 11
//#define DHTTYPE    DHT22     // DHT 22 (AM2302)
//#define DHTTYPE    DHT21     // DHT 21 (AM2301)

DHT dht(DHTPIN, DHTTYPE);

#define ONE_WIRE_BUS D5 // Digital pin connected to the DS18B20 sensor
OneWire oneWire(ONE_WIRE_BUS); // Setup a oneWire instance to communicate with any OneWire devices
DallasTemperature sensors(&oneWire);// Pass our oneWire reference to Dallas Temperature sensor

// variables for DS18B20 reading
float temperatureC = 0;
unsigned long t2 = 300; // pause for timer in loop
unsigned long t1 = 0; // timer increment

// current temperature & humidity, updated in loop(), for DHT
float t = 0.0;
float h = 0.0;

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);


// Generally, you should use "unsigned long" for variables that hold time
// The value will quickly become too large for an int to store
unsigned long previousMillis = 0;    // will store last time DHT was updated

const long interval = 10000; // Updates DHT readings every 10 seconds

// Codice HTML
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <style>
    html {
     font-family: Arial;
     display: inline-block;
     margin: 0px auto;
     text-align: center;
    }
    h2 { font-size: 3.0rem; }
    p { font-size: 3.0rem; }
    .units { font-size: 1.2rem; }
    .dht-labels{
      font-size: 1.5rem;
      vertical-align:middle;
      padding-bottom: 15px;
    }
  </style>
</head>
<body>
  <h2>Alex's Room</h2>
  <p>
    <i class="fas fa-temperature-high" style="color:#b32d00;"></i> 
    <span class="dht-labels">Temperature</span> 
    <span id="temperature">%TEMPERATURE%</span>
    <sup class="units">&deg;C</sup>
  </p>
  <p>
    <i class="fas fa-microchip" style="color:#059e8a;"></i> 
    <span class="dht-labels">DS18B20 Temp</span> 
    <span id="tempc">%TEMPERATUREC%</span>
    <sup class="units">&deg;C</sup>
  </p>
  <p>
    <i class="fas fa-tint" style="color:#0000ff;"></i> 
    <span class="dht-labels">Humidity</span>
    <span id="humidity">%HUMIDITY%</span>
    <sup class="units">%</sup>
  </p>
  
  <br>
  
</body>
<script>
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("temperature").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/temperature", true);
  xhttp.send();
}, 10000 ) ;
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("tempc").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/temperaturec", true);
  xhttp.send();
}, 10000) ;
setInterval(function ( ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("humidity").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/humidity", true);
  xhttp.send();
}, 10000 ) ;
</script>
</html>)rawliteral";

// Replaces placeholder with DHT values
String processor(const String& var) {
  //Serial.println(var);
  if (var == "TEMPERATURE") { // DHT temperature
    return String(t);
  }
  else if (var == "HUMIDITY") { // DHT humidity
    return String(h);
  }
  else if (var == "TEMPERATUREC") { // Ds18b20 temperature
    return String(temperatureC);
  }
  return String();
}

void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);
  dht.begin();

  sensors.begin();  // Start up the DS18B20 library

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println(".");
  }

  // Print ESP8266 Local IP Address
  Serial.println(WiFi.localIP());

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", index_html, processor);
  });
  server.on("/temperature", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", String(t).c_str());
  });
  server.on("/temperaturec", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", String(temperatureC).c_str());
  });
  server.on("/humidity", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/plain", String(h).c_str());
  });

  // Start server
  server.begin();
}

void loop() {
  if(millis()-t1>t2){ // updating Ds18b20 data every "t2" millisecond
    t1=millis();
  sensors.requestTemperatures();
  temperatureC = sensors.getTempCByIndex(0);
  }

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    // save the last time you updated the DHT values
    previousMillis = currentMillis;
    // Read temperature as Celsius (the default)
    float newT = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    //float newT = dht.readTemperature(true);
    // if temperature read failed, don't change t value
    if (isnan(newT)) {
      Serial.println("Failed to read from DHT sensor!");
    }
    else {
      t = newT;
      Serial.println(t);
      // print also DS18B20 temp
      Serial.print("DS temp:");
      Serial.print(temperatureC);
      Serial.println("ºC");
      delay(2500);
    }
    // Read Humidity
    float newH = dht.readHumidity();
    // if humidity read failed, don't change h value
    if (isnan(newH)) {
      Serial.println("Failed to read from DHT sensor!");
    }
    else {
      h = newH;
      Serial.println(h);
    }
  }
}
```