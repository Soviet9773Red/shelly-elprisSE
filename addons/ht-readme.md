### Shelly H&T WiFi Gen 3 sensor

This H&T add-on [ht-sensor-addon.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-sensor-addon.js) extends the main script *shelly-elpris.js* by adding temperature-based control using Shelly H&T Gen 3.

The purpose is to prevent unnecessary electricity consumption when the room temperature is already increasing due to other heat sources, for example a fireplace.

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/ht01.jpg" width="350"
     align="left"
     style="margin-right:15px; margin-bottom:10px;">

Shelly H&T Gen 3 is a battery-powered indoor temperature and humidity sensor with Wi-Fi connectivity and a local HTTP API.  
The device is compact, easy to place in living areas, and displays current temperature and humidity on its built-in screen. No cloud connection is required when used with this add-on.

**Example:**  
In a typical installation, the sensor is placed in the same room as a fireplace.  
When the fireplace is in use and the room temperature rises, the H&T sensor detects the change and electric heating is automatically disabled.  

This prevents electric radiators and the fireplace from operating simultaneously and reduces overall energy consumption without manual intervention.

The add-on is designed as an additional safety layer on top of price-based control and is optimized for low memory usage and fully local operation on Shelly devices.
<br clear="all">

## Configuration of Shelly H&T Gen 3 and H&T add-on

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/htstate.jpg" width="175"
     align="left"
     style="margin-right:15px; margin-bottom:10px;">

To configure Shelly H&T Gen 3, physical access to the device is required.  
Remove the back cover as shown in the image and briefly press the button on the circuit board. When the button is pressed, the text **SET** appears on the display. This indicates that the sensor has entered temporary configuration mode.

The SET mode remains active for approximately one to two minutes. After that, it automatically exits and the web interface becomes inaccessible. The configuration must therefore be completed without unnecessary delays.

While SET mode is active, open a web browser and connect to the sensor’s IP address.  
In the web UI, navigate to: **Settings -> Actions -> Temperature**

Here you configure an HTTP request that sends the current temperature to another Shelly device where the **shelly-elprisSE** script is running together with the H&T add-on.
<br clear="all">
<br>

<table width="360">
  <tr>
    <td>
      <img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/htback.jpg" width="175">
    </td>
    <td>
      <img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/htsetup.jpg" width="175">
    </td>
  </tr>
</table>

Example Action URL:  
http://ip/script/1/update-temp?temp=$temperature

- `ip` is the IP address of the Shelly device running the script, e.g. 192.168.10.117  
- `/script/1` is the script number of shelly-elprisSE on that device  
- `$temperature` is automatically replaced with the current temperature from the sensor  

<br clear="all">

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/actions.jpg" width="600"
     align="left"
     style="margin-right:15px; margin-bottom:10px;">

To test the add-on, the following URL can be opened manually in a browser (for 18°C):

http://ip/script/1/update-temp?temp=18

If the link is configured correctly, the add-on will receive the temperature value and update its internal state.

A single Shelly H&T sensor can be used simultaneously for multiple Shelly devices.  
This is done by creating multiple Actions with the same trigger (Temperature), but with different IP addresses and optionally different script numbers.

In this way, one sensor can function as a shared temperature source for multiple independent devices and installations.

<br clear="all">

After the SET mode has ended, the sensor continues normal operation.  
Actions are automatically triggered when the temperature changes and updated values are sent to the configured Shelly devices without further manual intervention.

**Note** that when Shelly H&T Gen 3 is battery-powered, it connects to the network independently of the sensor state and updates data according to the following behavior:

- The device wakes up and connects to WiFi approximately once per hour (± a few minutes), which can be seen in the router logs.  
- Temperature and humidity data are reported at least every two hours.  
- When the temperature changes, updated data is sent immediately.  
  By default, a threshold of ±0.5 °C is used to avoid unnecessary reporting.  
  Smaller temperature changes are therefore not reported.

> For humidity, the default minimum change threshold is 5 %, which can be adjusted down to 1 %.  
> At lower thresholds, even small changes in temperature or humidity may trigger an Action and call the HTTP link more frequently.

If Shelly H&T Gen 3 is powered via USB instead, network connections and updates occur more frequently, since power-saving mode no longer limits the communication frequency. Read more at
[support.shelly.cloud](https://support.shelly.cloud/en/support/solutions/articles/103000226308-wake-up-schemes-and-data-reporting-for-shelly-plus-h-t-and-shelly-gen3-h-t-devices)


<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/action-create.jpg" width="300"
     align="right"
     style="margin-right:15px; margin-bottom:10px;">

<br><br>

 **H&T Gen1:** Settings, add  http://ip/script/1/update-temp to "Actions > Sensor reports.
 <br>
 Remember to enable the "sensor reports" feature
<br><br>
 **H&T Gen2-3:**
Actions-> Temperature ->
Then Do -> http://ip/script/1/update-temp?temp=$temperature
Action Name -> Save
<br clear="all">
