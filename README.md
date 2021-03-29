# Termo Clima Service
[termoclimaservice.net](https://termoclimaservice.net)

![logo](https://github.com/mastroalex/TCS/blob/main/logo/grafica%20HQ.png)
# Introduction 
The main purpose of this project is to create an open system for the management of a domestic heating system. 

The system is open and provides an example through which it is possible to adapt it for each heating system. The system includes a puffer, solar panel and a boiler. 

<img src="https://github.com/mastroalex/TCS/blob/main/schemi_impianto/articles-quizzes-solar-collector2-1439195838.png" alt="system" width="500"/>

The management is carried out by an Arduino like system that allows you to detect temperatures and force the start-ups of the pumps remotely, via app, webserver or integration with alexa. In addition to temperature differences and heat losses the system also considers environmental conditions and weather previsions.
In the initial phase, boiler management is not considered but its shutdown is only forced on the basis of weather information. The  boiler managment is left to the solar control unit. This first phase involves a study of temperatures and heat losses and a data logging.

In a second phase this control will also be added.

The management of the heating of several rooms with radiators and the management of the air conditioners by means of an RF control will also be added.

The system also provides for the creation of chronothermostats and sensors for environmental well-being and comfort. Thermal safety devices and methane (or LPG) detectors will also be added. 

Finally, after a long testing period, the system will also replace the solar control unit.

# Shopping bag
* Arduino UNO
* NodeMCU ESP32
* Raspberry Pi
* Relais
* DS18B20 Thermal sensor 
* DHT11 / DHT12 / DHT22 Sensor
* PT1000

# Let's Work

### Puffer temperature detection

### Temperature and humidity
##
