# Add-ons
Optional extension scripts for shelly-elpris.
### 1. [ht-sensor-addon.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-sensor-addon.js)

This add-on is used together with [Shelly Wi-Fi H&T Gen 3](https://kb.shelly.cloud/knowledge-base/shelly-h-t-gen3) 
and requires a separate Shelly device (Plus 1, Pro 2/3, etc.) where the main script *shelly-elprisSE.js* is running. 
The H&T sensor sends only temperature data via Actions. The actual add-on logic runs on the main device. 
Sensor configuration is described in [ht-readme.md](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-readme.md).

```
/** ver. 1.0.4 H&T addon must be placed after
 * the main script // end of shelly-elpris
 * Controls cheap hours and ON-time based on temperature
 * H&T Gen1: Settings, add  http://ip/script/1/update-temp to "Actions > Sensor reports
 * Remember to enable the "sensor reports" feature
 * H&T Gen2-3: Settings -> Actions -> Temperature -> Then do:
 * http://ip/script/1/update-temp?temp=$temperature
 * where: ip = device IP, /script/1 = shelly-elprisSE script number
 * Test: http://ip/script/1/update-temp?temp=18
*/
```

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/scriptaddon.jpg" width="500"
     align="right"
     style="margin-right:15px; margin-bottom:10px;">

This H&T add-on [ht-sensor-addon.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-sensor-addon.js) 
extends the main script *shelly-elpris.js* by adding temperature-based control using a Shelly H&T sensor. 

The purpose is to prevent unnecessary electricity consumption when the room 
temperature is already rising due to other heat sources, for example a fireplace.

The add-on reads temperature data locally from the H&T sensor and
automatically adjusts the active hours and control minutes of the main script.

When the temperature reaches a predefined threshold, electric heating
can be limited or completely blocked. When the temperature drops again,
the system automatically returns to normal price-based operation.

The add-on does not control outputs directly. It only modifies
parameters used by the main control logic. This ensures stable and
predictable behaviour.

------------------------------------------------------------------------

### Custom temperature logic

The add-on includes an example of simple temperature-based control logic
demonstrating how the number of active heating hours and minutes can be
adjusted depending on the current temperature from the H&T sensor.

This logic is provided as a reference example only. It can be freely
modified to match specific installations, heating systems or personal
preferences.

Users may adjust: - temperature thresholds - number of active hours -
active minutes

The example code demonstrates a gradual reduction of heating time as
temperature increases. However, the add-on does not require this exact
logic to be used. The only common principle is that temperature values
influence the main script parameters.
<br clear="all">

All modifications of this logic are performed at the user's own
responsibility and require basic understanding of JavaScript and the
script structure.

```
// Change the number of heating hours and minutes (min) based on t°C from H&T
// Example logic for 2x12 hours periods

		(data.temp <= 18 ) ? (hours = 11, min = 60) :
		(data.temp <  19 ) ? (hours = 10, min = 60) :
		(data.temp <  20 ) ? (hours = 9,  min = 60) :
		(data.temp <  21 ) ? (hours = 8,  min = 60) :
		(data.temp < 21.5) ? (hours = 7,  min = 60) :
		(data.temp <  22 ) ? (hours = 4,  min = 60) :
		(data.temp < 22.5) ? (hours = 2,  min = 60) : // almost OFF
		(data.temp >=22.5) ? (hours = 0,  min = 60) : void 0; // OFF
		
// End of custom logic
```
