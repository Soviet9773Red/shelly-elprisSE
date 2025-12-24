# Add-ons
Optional extension scripts for shelly-elprisSE.
### 1. ht-sensor-addon.js 
Kan används ihop med Shelly Humidity and Temperatue Wi-Fi H&T sensor Gen 3    

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/ht01.jpg?raw=true" width="350"
     align="left"
     style="margin-right:15px; margin-bottom:10px;">
Detta H&T add-on [ht-sensor-addon.js](https://github.com/Soviet9773Red/shelly-elprisSE/tree/main/addons) kompletterar huvudskriptet *shelly-elprisSE.js* genom att lägga till temperaturbaserad styrning med hjälp av Shelly H&T Gen 3. Syftet är att undvika onödig elförbrukning när rumstemperaturen redan stiger av andra värmekällor, till exempel en kamin.

Add-on läser temperaturdata lokalt från Shelly H&T och justerar automatiskt huvudskriptets aktiva timmar och styrminuter. När temperaturen når ett fördefinierat tröskelvärde begränsas eller blockeras eluppvärmningen helt. När temperaturen sjunker återgår systemet automatiskt till normal prisstyrd drift. Add-on styr inte utgångar direkt utan påverkar endast parametrarna i huvudlogiken, vilket ger stabil och förutsägbar funktion.

Shelly H&T Gen 3 är en batteridriven temperatur- och fuktighetssensor för inomhusbruk med Wi-Fi-anslutning och lokalt HTTP-API. Enheten är kompakt, lätt att placera i vistelsezoner och visar aktuell temperatur och luftfuktighet på sin display. Ingen molnanslutning krävs för användning tillsammans med detta add-on.

I praktisk användning placeras sensorn i samma rum som kaminen. När kaminen används och temperaturen stiger registreras detta av H&T-sensorn och elvärmen kopplas bort automatiskt. Detta förhindrar att elradiatorer och kamin arbetar samtidigt och minskar därmed energiförbrukningen utan manuella ingrepp.
Add-on är avsett som ett extra skyddslager ovanpå prisstyrningen och är optimerat för låg minnesförbrukning och lokal drift på Shelly-enheter.
<br clear="all">

## Konfiguration av Shelly H&T Gen 3 och H&T add-on
<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/htback.jpg?raw=true" width="175"
     align="left"
     style="margin-right:15px; margin-bottom:10px;">
För att konfigurera Shelly H&T Gen 3 krävs först fysisk åtkomst till enheten. Ta bort bakstycket enligt bilden och tryck kort på knappen på kretskortet. När knappen trycks visas texten **SET** på displayen. Detta innebär att sensorn har gått in i ett tillfälligt konfigurationsläge.

SET-läget är endast aktivt i cirka en minut. Därefter avslutas det automatiskt och webbgränssnittet blir otillgängligt. Konfigurationen måste därför genomföras utan onödiga pauser.

När SET-läget är aktivt, öppna en webbläsare och anslut till sensorns IP-adress.   
I wewbUI, gå till:  Settings -> Actions -> Temperature
<br clear="all">

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/htsetup.jpg?raw=true" width="175"
     align="left"
     style="margin-right:15px; margin-bottom:10px;">
Här konfigureras ett HTTP-anrop som skickar aktuell temperatur till ett annat Shelly-enhet där skriptet **shelly-elprisSE** körs tillsammans med H&T add-on.

Exempel på Action-URL:

http://ip-address/script/1/update-temp?temp=$temperature

där:
- ip-address är IP-adressen till Shelly-enheten som kör skriptet,
- /script/1 är skriptnumret för shelly-elprisSE på den enheten,
- $temperature ersätts automatiskt med aktuell temperatur från sensorn.
<br clear="all">

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/htstatus.jpg?raw=true" width="600"
     align="left"
     style="margin-right:15px; margin-bottom:10px;">
För test kan följande URL öppnas manuellt i webbläsaren:

http://ip-address/script/1/update-temp?temp=18

Om länken är korrekt konfigurerad kommer add-on att ta emot temperaturvärdet och uppdatera sitt interna tillstånd.

En och samma Shelly H&T-sensor kan användas för flera Shelly-enheter samtidigt. Detta görs genom att skapa flera Actions med samma trigger (Temperature), men med olika IP-adresser och eventuellt olika skriptnummer. På så sätt kan en sensor fungera som gemensam temperaturkälla för flera oberoende enheter och installationer.
<br clear="all">
Efter att SET-läget har avslutats fortsätter sensorn att fungera normalt. Actions triggas automatiskt vid temperaturförändringar och skickar uppdaterade värden till de konfigurerade Shelly-enheterna utan ytterligare manuell hantering.


