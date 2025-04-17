### shelly-elprisSE
SE1-4 Nordpool elbörspris (spotpris) för Shelly-enheter

[![Licens: AGPL v3](https://img.shields.io/badge/Licens-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**shelly-elprisSE** är ett script för Shelly-enheter (Plus / Pro / Plug S) som styr utgångar baserat på Nordpools timpriser i svenska elområden SE1–SE4. Priser hämtas från [elprisetjustnu.se](https://www.elprisetjustnu.se/) via deras öppna JSON-API.

Utvecklat av [@Soviet9773Red](https://github.com/Soviet9773Red), med stort tack till [Jussi Isotalo](https://github.com/jisotalo) för den ursprungliga logiken, till [Mikael Ulvesjo](https://github.com/MikaelUlvesjo) för idén till effektiv prisparsning, samt till GPT4o/o1 för flerstegsutveckling, refaktorering och testning.

---

## Funktionalitet i version 3.1.1SE
- Automatisk hämtning och analys av elpriser för idag och imorgon (när tillgängligt).
- Kompatibilitet med sommar-/vintertid (24 datapunkter behålls genom förenklad hantering).
- För varje instans analyseras lägsta, högsta, genomsnittligt elpris samt aktuell timme.
- Anpassningsbar logik för att slå på utgångar under billigaste timmarna, eller enligt tröskelvärden.
- Utgångarna styrs enligt konfiguration via GUI eller HTTP API.
- Full historik för varje instans (max 24 datapunkter).
- Inställningarna sparas lokalt i KVS.
- Endpoint-meny för visning och styrning via webbläsare.

## Tekniska egenskaper
- Kräver firmware **v1.5.1 eller nyare**.
- Kompatibel med Shelly Plus 1 / 1PM / Plug S / Pro 3 m.fl.
- Kod optimerad för enheter med begränsat RAM (inga arrow-funktioner, minimalt minnesavtryck).
- JSON-API används istället för CSV (till skillnad från Elering).
- Tid för API-hämtning konfigureras via variabel `ah` (standard kl. 14).
- Minut för förfrågan väljs slumpmässigt vid första uppstart för att sprida nätbelastning mellan enheter.
- HTTP endpoint: fliken "Outputs" har bytt namn till "Config".

---

## Viktig information  
**[shelly-elprisSE](https://github.com/Soviet9773Red/shelly-elprisSE)** är en svensk anpassning av det finska projektet **[shelly Porssisahko](https://github.com/jisotalo/shelly-porssisahko)**, ursprungligen utvecklat för Finland och Baltikum.  Denna version använder det svenska elpris-API:t [Elprisetjustnu.se](https://www.elprisetjustnu.se/) istället för [Elering](https://elering.ee/) standarddata.

Observera att inga globala ändringar har gjorts i funktionaliteten jämfört med originalkoden från [shelly-porssisahko-en](https://github.com/jisotalo/shelly-porssisahko-en) (ver. 3.1.1). För en fullständig manual, se [originalkällan.](https://github.com/jisotalo/shelly-porssisahko-en)  

---

## Komma igång
1. Anslut din Shelly-enhet till nätverket.
2. Uppgradera firmware till senaste **stable** version ≥ 1.5.1.
3. Välj tidszon: **Europe/Stockholm** (viktigt för rätt prislogik).
4. Skapa nytt script i Shelly Web UI, klistra in [senaste scriptet från GitHub](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/3.1.1SE.js).
5. Starta scriptet och öppna konsolen för att se resultat och HTTP-länk.

  ## 📷 Inställningsvy
Här är en illustration av info (status) och konfigurationsvyn:
<table><tr>
      <td><img src="https://raw.githubusercontent.com/Soviet9773Red/shelly-elprisSE/main/StatP.jpg" width="500"></td>
      <td><img src="https://raw.githubusercontent.com/Soviet9773Red/shelly-elprisSE/main/SetP.jpg" width="500"></td>
    </tr>
</table>

---

## Huvudsakliga ändringar (changelog): 
- **API-anrop:**  
  Ändrat från den estniska API-adressen i `.csv`-format ([Elering](https://elering.ee/)) till den svenska i JSON-format ([Elprisetjustnu.se](https://www.elprisetjustnu.se/)).  
- **Regioner:**  
  Stöd för svenska elområden SE1-SE4 har lagts till, medan Finland och Baltikum har tagits bort.  
- **Design:**  
  Justeringar av färgschema och rubriker i flikarna *Status* och *Settings* för att bättre passa den svenska marknaden.

## Mer information
Alla större ändringar mellan versioner finns beskrivna i [CHANGELOG.md](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/CHANGELOG.md).

För detaljerad dokumentation om originalfunktioner hänvisas till [jisotalos README](https://github.com/jisotalo/shelly-porssisahko-en).

---

## Stöd projektet
Jag är ofta hungrig när jag kodar – 🍔 [bjud mig på en Big Mac och kaffe](https://buymeacoffee.com/soviet9773red)

[![Big Mac](https://img.shields.io/badge/Buy%20me%20a%20🍔-Big%20Mac-yellow?style=for-the-badge)](https://buymeacoffee.com/soviet9773red)

Tack!
