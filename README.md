# Solar Heating Control Unit
[termoclimaservice.net](https://termoclimaservice.net)

![logo](https://github.com/mastroalex/TCS/blob/main/logo/grafica%20HQ.png)
# Introduction 
The main purpose of this project is to create an open system for the management of a domestic heating system. 

The system is open and provides an example through which it is possible to adapt it for each heating system. The system includes a puffer, solar panel and a boiler. 

<img src="https://github.com/mastroalex/TCS/blob/main/schemi_impianto/articles-quizzes-solar-collector2-1439195838.png" alt="system" width="500"/>

The management is carried out by an Arduino like system that allows you to detect temperatures and force the start-ups of the pumps remotely, via app, webserver or integration with alexa. In addition to temperature differences and heat losses the system also considers environmental conditions and weather previsions.
In the initial phase, boiler management is not considered but its shutdown is only forced on the basis of weather information. The  boiler managment is left to the solar control unit. This first phase involves a study of temperatures and heat losses and a data logging.

The first phase of data collection will be done using the [SinricPro](https://sinric.pro) platform.

<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266sinric/sinric_diagram.png" alt="diagram_sinric" width="1000"/>

> This follows from the experience gained during the [tempcontrol](https://github.com/mastroalex/tempcontrol#raspberry-pi-lamp-server) project for an **Environmental conditions measurement unit**.

In a second phase this control will also be added.

The management of the heating of several rooms with radiators and the management of the air conditioners by means of an RF control will also be added.

The system also provides for the creation of chronothermostats and sensors for environmental well-being and comfort. Thermal safety devices and methane (or LPG) detectors will also be added. 

Finally, after a long testing period, the system will also replace the solar control unit.

# Shopping bag
* Arduino UNO
* NodeMCU ESP32
* NodeMCU ESP8266
* Raspberry Pi
* Relais
* DS18B20 Thermal sensor 
* DHT11 / DHT12 / DHT22 Sensor
* PT1000
* CT Sensor YHDC 30A 

# Let's Work

Different sensors are used:
- DHT11 for ambient temperature and humidity
- DS18B20 for water or pipe temperature
- CT Sensor for energy 



## Puffer temperature detection

Three different DS18B20s are used to sense the temperature from different temperature wells.
One in the upper part for the sanitary water outlet, one in the lower part for the solar inlet and the last in the central part where the boiler inlet is located.

<img src="https://2.bp.blogspot.com/_ZNZ7m9tKOBk/TT_J15ARKKI/AAAAAAAAAD8/zJG25-GOOPY/s1600/A%2BThermowell.jpg" alt="tempwell" width="300"/>


Additional DS18B20s can be positioned on the flow and return pipes from the boiler to collect interesting data.

## Temperature and humidity

DHT Sensors are used to sense ambiente temperature and humidty.
Different data from indoor and outdoor sensor are taken from different board. 
There is at least one sensor for each floor of the house and one outdoor sensor.

<img src="https://lastminuteengineers.com/wp-content/uploads/arduino/Inside-DHT11-DHT22-AM2302-Temperature-Humidity-Sensor.jpg" alt="dht" width="300"/>

## Energy monitor 

Other interesting information is drawn from the CT sensor to analyze the energy consumption of boilers and pumps, to analyze their power on state and for other interesting calculations


---

## Other sensor and actuators

Also GAS (methane of LPG) sensor can be added for extra alarm and emergency shutdown.

Relays controlled by a transistor are used to activate particular outputs such as pumps, solenoid valves or clean contacts. Any circuits will be discussed on a case-by-case basis

<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.letscontrolit.com%2Fwiki%2Findex.php%2FBasics%3A_Relays&psig=AOvVaw07HkKT53bez9-U0XiF1E_e&ust=1617570242052000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNj9xPD84u8CFQAAAAAdAAAAABAe" alt="relais" width="500"/>


> For the circuit diagram thanks to [letscontrolit.com](https://www.letscontrolit.com/wiki/index.php/Basics:_Relays)

##  ESP 8622 web server and sensors reading

>  **For general sensor reading search in** [example folder](https://github.com/mastroalex/tempcontrol/blob/main/esp8266_sensor_reading/README.md) 

In this case a wemos D32 is used. 
To use it with Arduino IDE instal ESP8266 Library and select NodeMCU 1 (ESP-12E) board. It is also important to install CH340G driver.
Use this link [esp8266 package](http://arduino.esp8266.com/stable/package_esp8266com_index.json) to add board manager and after install esp8266.

<img src="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2019/05/ESP8266-NodeMCU-kit-12-E-pinout-gpio-pin.png?w=817&quality=100&strip=all&ssl=1" alt="nodemcu12E" width="800"/>

---

**Circuit diagram**

<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266_sensor_reading/sensor_esp8266_bb.png" alt="nodemcu12E" width="800"/>

---

#### DHT 
To read DHT11 is used DTH library from Adafruit. 
Frist include library and define pin
 ```c
#include "DHT.h"
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
// Reading temperature or humidity takes about 250 milliseconds!
// Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
float h = dht.readHumidity();
// Read temperature as Celsius (the default)
float t = dht.readTemperature();
  ```
Define variables and print it with:
 ```c
Serial.print(h)
Serial.print(t)
 ```

> **For other info** [DHT11 Reading Example](https://github.com/mastroalex/tempcontrol/tree/main/esp8266_sensor_reading/dht11_test) 

---

#### Web server
The web server can be accessed with any device that has a browser on your local network.
This is an asynchronous web server that update data automatically without need to refresh the web page and with custom CSS to style the web page.

**Complete description** in: [ESP8266 Web Server Extra](https://github.com/mastroalex/tempcontrol/tree/main/esp8266webserveinfo)


<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266webserveinfo/webserver_example.png" alt="system" width="300"/>

> DS18B20 hand held to see temperature difference

Install the DHT library by Adafruit.

Follow the next step to install the ESPAsyncWebServer library:
1. Download [AsyncWebServer library](https://github.com/me-no-dev/ESPAsyncWebServer/archive/master.zip)
2. Unzip the .zip folder
3. Rename your folder from ~~ESPAsyncWebServer-master~~ to ESPAsyncWebServer
4. Move the ESPAsyncWebServer folder to your Arduino IDE installation libraries folder

Follow the next step to install the ESPAsync TCP Library:
1. Download [ESPAsync TCP library](https://github.com/me-no-dev/ESPAsyncWebServer/archive/master.zip)
2. Unzip
3. Rename your folder from ~~ESPAsyncTCP-master~~ to ESPAsyncTCP
4. Move the ESPAsyncTCP folder to your Arduino IDE installation libraries folder
Restard Arduino IDE.

The example code is presented in [esp8266 example folder](https://github.com/mastroalex/tempcontrol/tree/main/esp8266webserveinfo)

Insert wifi credentials!
```c
const char* ssid = "REPLACE_WITH_YOUR_SSID";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";
```

The webpage include heading and differents paragraph to display sensor data.There are also two icons to style the page.

All the HTML text with styles included is stored in the index_html variable. Now we’ll go through the HTML text and see what each part does.

```html
<p>
  <i class="fas fa-thermometer-half" style="color:#059e8a;"</i> 
  <span class="dht-labels">Temperature</span> 
  <span id="temperature">%TEMPERATURE%</span>
  <sup class="units">°C</sup>
</p>
```

For automatic updates ther's some JavaScript code in our web page that updates the temperature and humidity automatically, every 10 seconds. Scripts in HTML text should go between the `<script></script>` tags.

Example for temperature:
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
<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266webserveinfo/webserver.png" alt="system" width="700"/>

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

___

#### Add extra sensor data


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
___

> **For other info to** [ESP8266 Web Server Extra](https://github.com/mastroalex/tempcontrol/tree/main/esp8266webserveinfo)

> Thanks to Rui Santos. For other information and code comments [DHT11 ESP8266 Web Server](https://randomnerdtutorials.com/esp8266-dht11dht22-temperature-and-humidity-web-server-with-arduino-ide/)

---

#### DS18B20

Install library for DS18B20: install [OneWire](https://github.com/PaulStoffregen/OneWire) from library manager. Install Dallas Temperature library by Miles Burton from library manager.

Include library and define pin:
```c
#include <OneWire.h>
#include <DallasTemperature.h>
// GPIO where the DS18B20 is connected to
const int oneWireBus = D5;     
```
Setup comincation:
```c
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);
```

In the `setup()` section start sensors and serial.
Request temperature with:
```c
sensors.requestTemperatures(); 
float temperatureC = sensors.getTempCByIndex(0);
```

> **For other info** [DS18B20 Reading Exampe](https://github.com/mastroalex/tempcontrol/tree/main/esp8266_sensor_reading/ds18b20_test)

---

##  ESP 32 web server and sensors reading

<img src="https://i2.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/08/ESP32-DOIT-DEVKIT-V1-Board-Pinout-36-GPIOs-updated.jpg?w=750&quality=100&strip=all&ssl=1" alt="esp32" width="700"/>

The section for ESP 32 will be updated soon.

---


## Alexa integrations 

For integration with Alexa we will use the functions offered by Sinric Pro.

---
### Sinric Pro Temperature Sensor

Sinric pro is a very practical platform that allows us to connect the development board to Alexa and Google Home.
The first step is to create an account on [Sinric Pro](https://portal.sinric.pro/register).

#### ESP8266

For the wifi connection, DHT reading and calbe connection we use the same web server procedure indicated above.

Install and include library and dependencies for SinricPro:
```c
#include <SinricPro.h>
#include "SinricProTemperaturesensor.h"
```

Define the following constants available from the web page of your Sinric account:

```c
#define APP_KEY           "YOUR-APP-KEY"      
#define APP_SECRET        "YOUR-APP-SECRET"   
#define TEMP_SENSOR_ID    "YOUR-DEVICE-ID"   
bool deviceIsOn;                              // Temeprature sensor on/off state
float lastTemperature;                        // last known temperature (for compare)
float lastHumidity;                           // last known humidity (for compare)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds
unsigned long lastEvent = (-EVENT_WAIT_TIME); // last time event has been sent 
```
There are other important function like `onPowerState()` that callback for setPowerState request parameters and return true if request should be marked as handled correctly / false if not. The `handleTemperatatureSensor()` that checks if `Temperaturesensor` is turned on, get actual temperature and humidity and check if these values are valid and send event to SinricPro Server if temperature or humidity changed. The `setupSinricPro()` to inizialize Sinric comunciation.

So they look like:

```c

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Temperaturesensor turned %s (via SinricPro) \r\n", state ? "on" : "off");
  deviceIsOn = state; // turn on / off temperature sensor
  return true; // request handled properly
}

void handleTemperaturesensor() {
  if (deviceIsOn == false) return; // device is off...do nothing

  unsigned long actualMillis = millis();
  if (actualMillis - lastEvent < EVENT_WAIT_TIME) return; //only check every EVENT_WAIT_TIME milliseconds

  t = dht.readTemperature();          // get actual temperature in °C
  //  temperature = dht.getTemperature() * 1.8f + 32;  // get actual temperature in °F
  h = dht.readHumidity();                // get actual humidity

  if (isnan(t) || isnan(h)) { // reading failed...
    Serial.printf("DHT reading failed!\r\n");  // print error message
    return;                                    // try again next time
  }

  if (t == lastTemperature || h == lastHumidity) return; // if no values changed do nothing...

  SinricProTemperaturesensor &mySensor = SinricPro[TEMP_SENSOR_ID];  // get temperaturesensor device

  bool success = mySensor.sendTemperatureEvent(t, h); // send event
  if (success) {  // if event was sent successfuly, print temperature and humidity to serial
    Serial.printf("Temperature: %2.1f Celsius\tHumidity: %2.1f%%\r\n", t, h);
  } else {  // if sending event failed, print error message
    Serial.printf("Something went wrong...could not send Event to server!\r\n");
  }

  lastTemperature = t;  // save actual temperature for next compare
  lastHumidity = h;        // save actual humidity for next compare
  lastEvent = actualMillis;       // save actual time for next compare
}


// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProTemperaturesensor &mySensor = SinricPro[TEMP_SENSOR_ID];
  mySensor.onPowerState(onPowerState);

  // setup SinricPro
  SinricPro.onConnected([]() {
    Serial.printf("Connected to SinricPro\r\n");
  });
  SinricPro.onDisconnected([]() {
    Serial.printf("Disconnected from SinricPro\r\n");
  });
  SinricPro.begin(APP_KEY, APP_SECRET);
  SinricPro.restoreDeviceStates(true); // get latest known deviceState from server (is device turned on?)
}

```

Include in `setup()` the `setupSinricPro()` function.

Call in `loop()` the function:

```c
  SinricPro.handle();
  handleTemperaturesensor(); 
```
#### Alexa

It's possibile to add Sinric Pro skills in Alexa app and login with Sinric credential to add device.

<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266sinric/alexa_dht_mobileapp.png" alt="alexa_app_dht" width="400">

#### App 

It's possibile to download the Sinric Pro App or to login into SinricPro website to visualize sensor data log for different time period. 

<img src="https://github.com/mastroalex/tempcontrol/blob/main/esp8266sinric/sinric_dht_mobileapp.png" alt="sinric_app_dht" width="400">




> **Other information and complete sketch in** [esp8266 sinric example folder](https://github.com/mastroalex/tempcontrol/tree/main/esp8266sinric)


This code will be integrated with that of the web server.

---

##
