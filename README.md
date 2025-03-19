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

Observera att inga globala ändringar har gjorts i funktionaliteten jämfört med originalkoden från [shelly-porssisahko-en](https://github.com/jisotalo/shelly-porssisahko-en) (basversion 3.1.1).  
📌 **För en fullständig beskrivning av funktionaliteten, se originalkällan:**  
🔗 [https://github.com/jisotalo/shelly-porssisahko-en](https://github.com/jisotalo/shelly-porssisahko-en)  

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


