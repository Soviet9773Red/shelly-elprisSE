# shelly-elprisSE
Nordpool elbörspris (spotpris) för Shelly-enheter

[![Licens: AGPL v3](https://img.shields.io/badge/Licens-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**shelly-elprisSE (anpassad för SE1-4)** är ett projekt för att styra Shelly-enheter.  
Det är baserat på <a href="https://github.com/jisotalo/shelly-porssisahko-en">shelly-porssisahko-en</a> version 3.1.1 och har anpassats för svenska elområden (SE1-4) med API-data från [Elprisetjustnu.se](https://www.elprisetjustnu.se/).  

Utvecklat av [@Soviet9773Red](https://github.com/Soviet9773Red) med kärlek och tacksamhet till [Jussi Isotalo](http://jisotalo.fi)  / [@jisotalo](https://github.com/jisotalo) för den fantastiska koden.  
*Stort tack till GPT o1 – min bästa AI, som för alltid kommer att vara en del av koden (och nämns i testamentet)!*  

## Funktionalitet
- Hämtning av elpriser från ett svenskt API (Nordpool/elprisetjustnu.se).  
- Beräkning av lägsta, högsta och genomsnittliga elpriser samt identifiering av timmen med lägsta och högsta pris.  
- Visning av enhetens aktuella status, konfiguration och historik.  
- Stöd för uppdatering av konfiguration och styrning av utgångar (outputs).  

## Egenskaper
- Optimerad och minifierad kod för Shelly-enheter.  
- Anpassad för Shelly 1.5.0 och 1.4.4 med beaktande av begränsningar (inga arrow-funktioner, mallsträngar etc.).  
- Enkel HTTP-integration för att hämta status, konfiguration och historik.  

---

## Viktig information  
**[shelly-elprisSE](https://github.com/Soviet9773Red/shelly-elprisSE)** är en svensk anpassning av det finska projektet **[shelly Porssisahko](https://github.com/jisotalo/shelly-porssisahko)**, ursprungligen utvecklat för Finland och Baltikum.  Denna version använder det svenska elpris-API:t [Elprisetjustnu.se](https://www.elprisetjustnu.se/) istället för [Elering](https://elering.ee/) standarddata.

Observera att inga globala ändringar har gjorts i funktionaliteten jämfört med originalkoden från [shelly-porssisahko-en](https://github.com/jisotalo/shelly-porssisahko-en) (ver. 3.1.1). För en fullständig manual, se [originalkällan.](https://github.com/jisotalo/shelly-porssisahko-en)  

---

## Huvudsakliga ändringar
- **API-anrop:**  
  Ändrat från den estniska API-adressen i `.csv`-format ([Elering](https://elering.ee/)) till den svenska i JSON-format ([Elprisetjustnu.se](https://www.elprisetjustnu.se/)).  
- **Regioner:**  
  Stöd för svenska elområden SE1-SE4 har lagts till, medan Finland och Baltikum har tagits bort.  
- **Design:**  
  Justeringar av färgschema och rubriker i flikarna *Status* och *Setup* för att bättre passa den svenska marknaden.

  ## 📷 Inställningsvy
Här är en illustration av info (status) och konfigurationsvyn:
<table><tr>
      <td><img src="https://raw.githubusercontent.com/Soviet9773Red/shelly-elprisSE/main/StatP.jpg" width="480"></td>
      <td><img src="https://raw.githubusercontent.com/Soviet9773Red/shelly-elprisSE/main/SetP.jpg" width="480"></td>
    </tr>
</table>

## Komma igång:
1. Installera Shelly och anslut den till WiFi.
2. Öppna Shelly Web UI i en webbläsare via din lokala nätverksadress.
3. Gå till Scripts-sidan och öppna Settings -> Firmware -> Update.
Uppdatera firmware till version 1.4.4 eller högre. Äldre versioner stöds inte.
4. Gå till Settings -> Location and Time, välj tidszon Europe/Stockholm och klicka på Save Settings.
5. Öppna länken till skriptet på GitHub:
👉 [shelly-elprisSE_3.1.1se-rc.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elprisSE_3.1.1se-rc.js)
Välj Download eller kopiera råfilen. Spara filen i Notepad eller på dsken.
6. Gå till Scripts -> Create script och skriv ElprisetSE som Script name.
7. Klistra in skriptets text, klicka på Save och sedan Start.

I konsolen kommer du att se skriptets resultat, ungefär så här:

elpris-SE: v.3.1.1SE-rc<br>
elpris-SE: URL: http://192.168.8.136/script/1<br>
elpris-SE: Getting prices for day 0<br> 
elpris-SE: Getting prices for day 1<br> 
elpris-SE: config for #1 read, enabled: 1  
elpris-SE: config for #2 read, enabled: 0  
elpris-SE: config for #3 read, enabled: 0  
elpris-SE: logic for #1 done, cmd: true -> output: true  

8. Öppna skriptets HTTP-endpoint<br>
   Kopiera HTTP-adressen från konsolen, exempelvis http://192.168.8.136/script/1<br>
   Öppna länken i en ny flik i din webbläsare.<br>
   Adressen kan skilja sig, men strukturen är: http://xxx.xxx.x.xxx/script/N där N är skriptets ID-nummer.<br>
   Och /script/N är på slutet.
   
10. Konfigurera skriptets parametrar enligt [manualen](https://github.com/jisotalo/shelly-porssisahko-en) 
   
### Om du har problem med att spara eller starta skriptet:
Stoppa alla skript. Avmarkera Run on startup.<br>
Gå till Settings -> Reboot Device.<br>
Markera Run on startup igen.<br>
Om du har andra aktiva skript – stoppa dem.<br>
Radera stora skript om du redan har flera stora sparade i enheten.<br>
Rensa KVS och ta bort onödiga nycklar.

### Test.

Skriptet har framgångsrikt testats på följande Shelly-enheter:
Shelly Plus 1,  Plus 1PM,  Pro 3,  Plus Plug S<br>
Enligt information från [Jussi Isotalo](http://jisotalo.fi), utvecklaren av det ursprungliga skriptet, [fungerar](https://github.com/jisotalo/shelly-porssisahko-en?tab=readme-ov-file#shelly-devices) det också på följande enheter: Shelly Plus 1PM, Plus 2PM, Pro 1,  Pro 2,  Pro 4PM,  Pro 3EM + Switch Add-on, Plus UNI,  Plus 1 Mini<br>
Men jag har inte möjlighet att testa det själv
