# Add-ons
Optional extension scripts for shelly-elprisSE.
### 1. ht-sensor-addon.js 
Kan används ihop med [Shelly Wi-Fi H&T Gen 3](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-readme.md) sensor. 

Detta H&T add-on [ht-sensor-addon.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-sensor-addon.js) kompletterar huvudskriptet *shelly-elprisSE.js* genom att lägga till temperaturbaserad styrning med hjälp av Shelly H&T Gen 3. Syftet är att undvika onödig elförbrukning när rumstemperaturen redan stiger av andra värmekällor, till exempel en kamin.

Add-on läser temperaturdata lokalt från Shelly H&T och justerar automatiskt huvudskriptets aktiva timmar och styrminuter. När temperaturen når ett fördefinierat tröskelvärde begränsas eller blockeras eluppvärmningen helt. När temperaturen sjunker återgår systemet automatiskt till normal prisstyrd drift. Add-on styr inte utgångar direkt utan påverkar endast parametrarna i huvudlogiken, vilket ger stabil och förutsägbar funktion.



