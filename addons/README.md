# Add-ons
Optional extension scripts for shelly-elprisSE.
### 1. ht-sensor-addon.js 
Kan används ihop med [Shelly Wi-Fi H&T Gen 3](https://kb.shelly.cloud/knowledge-base/shelly-h-t-gen3) , läs mer i [ht-readme.md](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-readme.md) 

Detta H&T add-on [ht-sensor-addon.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/ht-sensor-addon.js) kompletterar huvudskriptet *shelly-elprisSE.js* genom att lägga till temperaturbaserad styrning med hjälp av Shelly H&T Gen 3. Syftet är att undvika onödig elförbrukning när rumstemperaturen redan stiger av andra värmekällor, till exempel en kamin.

Add-on läser temperaturdata lokalt från Shelly H&T och justerar automatiskt huvudskriptets aktiva timmar och styrminuter. När temperaturen når ett fördefinierat tröskelvärde begränsas eller blockeras eluppvärmningen helt. När temperaturen sjunker återgår systemet automatiskt till normal prisstyrd drift. Add-on styr inte utgångar direkt utan påverkar endast parametrarna i huvudlogiken, vilket ger stabil och förutsägbar funktion.

```
/** ver. 1.0.4 H&T addon
 * insert directly into main script after // end of shelly-elpris
 * Controls cheap hours and ON-time based on temperature
 * H&T Gen2-3: Settings -> Actions -> Temperature -> Then do:
 * http://ip/script/1/update-temp?temp=$temperature
 * where: ip = device IP, /script/1 = shelly-elprisSE script number
 * Test: http://ip/script/1/update-temp?temp=18
*/
```

I add-on ingår ett exempel på enkel temperaturbaserad styrlogik som visar hur antal aktiva timmar och minuter kan justeras beroende på aktuell temperatur från H&T-sensorn. Denna logik är avsedd som ett referensexempel och kan fritt ändras eller anpassas efter egna behov. Användaren kan justera temperaturgränser, antal timmar och aktiva minuter för att skapa ett beteende som bättre motsvarar den egna installationen, värmesystemet eller personliga preferenser. Exempelkoden demonstrerar ett möjligt sätt att stegvis minska eluppvärmningens driftstid i takt med stigande temperatur, men add-onet ställer inga krav på att just denna logik används. Endast principen - att temperaturvärden påverkar huvudskriptets parametrar - är gemensam. 

All ändring av denna logik sker på användarens eget ansvar och förutsätter grundläggande förståelse för JavaScript och skriptets struktur.

```
// Change the number of heating hours and minutes (min) based on t°C from H&T
// Example logic for 2x12 hours periods
	(data.temp <= 18 ) ? (hours = 11, min = 60) :
	(data.temp <  19 ) ? (hours = 10, min = 60) :
	(data.temp <  20 ) ? (hours = 9,  min = 60) :
	(data.temp <  21 ) ? (hours = 8,  min = 45) :
	(data.temp < 21.5) ? (hours = 7,  min = 45) :
	(data.temp < 22.5) ? (hours = 4,  min = 45) :
	(data.temp >=22.5) ? (hours = 1,  min = 30) : null; // almost OFF
// End of custom logic
```
