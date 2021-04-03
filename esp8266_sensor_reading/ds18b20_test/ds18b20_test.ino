
#include <OneWire.h>
#include <DallasTemperature.h>

// GPIO where the DS18B20 is connected to
const int oneWireBus = D5;     

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

void setup() {
  // Start the Serial Monitor
  Serial.begin(115200);
  // Start the DS18B20 sensor
  sensors.begin();
}
float DSTemp(){
  sensors.requestTemperatures(); 
  float temperatureC = sensors.getTempCByIndex(0);
  return temperatureC;
  }
void loop() {
  
  Serial.print(DSTemp());
  Serial.println("ºC");
  delay(2500);
}
//void loop() {
//  sensors.requestTemperatures(); 
//  float temperatureC = sensors.getTempCByIndex(0);
//  Serial.print(temperatureC);
//  Serial.println("ºC");
//  delay(2500);
//}
