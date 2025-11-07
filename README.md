# SE1-4 Nordpool elbörspris (spotpris) för Shelly-enheter: **shelly-elprisSE**

[![Licens: AGPL v3](https://img.shields.io/badge/Licens-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**shelly-elprisSE** är ett script för Shelly-enheter (Plus/Pro/Plug S) som styr utgångar baserat på Nordpools spotpriser i svenska elområden SE1-SE4. Projektet är en svensk vidareutveckling av det finska **[shelly Porssisahko](https://github.com/jisotalo/shelly-porssisahko)**, ursprungligen skapat för Finland och Baltikum.  I tidigare versioner hämtades priserna från elprisetjustnu.se via deras öppna JSON-API, men från och med version **3.1.3** används nu en proxykälla [elpris.eu](https://elpris.eu) - för stabil och effektiv hämtning av elpriser i det kompakta `avg24`-formatet.

**Shelly-elprisSE 3.1.3 Release Notes**

**Highlights**  
⚡ 15-minute data support - automatic aggregation (96→24) for compatibility with 1-hour logic.  
⚙️ Improved setup interface: support for multiple outputs and custom hour ranges.  
🧮 Updated status view with summary tables for prices and outputs (today / tomorrow).  
💰 Extended grid-fee model - new weekday/weekend differentiation and dynamic fee detection based on time of day.  
🆘 Integrated Help tab with built-in documentation, accessible directly via the web UI.  
🪄 Redesigned interface - clearer tables, refined layout, and responsive design for mobile use.  
🔧 Improved price handling - stable avg24 format parsing with validation for DST (23/25-hour days).  
🧩 Bug fixes: corrected midnight rollover logic, VAT calculation rounding, and restored override persistence.  

---

## Komma igång
1. Anslut din Shelly-enhet till nätverket.  
2. Uppgradera firmware till senaste **stable** version ≥ 1.7.1.  
3. Välj tidszon: **Europe/Stockholm** (viktigt för korrekt prislogik).  
4. Skapa ett nytt script i Shelly Web UI och klistra in den senaste versionen [shelly-elprisSE.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elprisSE.js).  
5. Starta scriptet och öppna konsolen för att se resultatet och HTTP-länken.  
6. Öppna länken från konsolen. Du ser något i stil med:  

```
elpris-SE: v.3.1.3SE
elpris-SE: URL http://192.168.8.119/script/1
```
<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/console.png?raw=true" width="397">

7. Öppna skriptets HTTP-endpoint.  
Kopiera HTTP-adressen från konsolen och öppna länken i en ny flik i din webbläsare.  
Adressen kan skilja sig – se den exakta adressen i konsolen.

**Viktigt:**  
I version 3.1.3 har strukturen för KVS-nycklar ändrats och konfiguration **#3** har tagits bort.  
Innan du startar den nya versionen bör du ta bort gamla KVS-nycklar, eftersom även deras interna struktur har uppdaterats.  

Den första nyckeln `Elpris` har utökats med nya fält som lagrar operatörens helgtariffer.  
Ett exempel på den nya strukturen:

```javascript
{
  "g": "SE3",          // Elområde (SE1–SE4)
  "vat": 0,            // Moms (0 = av)
  "day": 0.536,        // Dagavgift (vardagar kl. 06–22).
  "night": 0.214,      // Nattavgift (vardagar kl. 22–06).
  "names": ["-", "-"], // Namn på konfigurationer 
  "dayw": 0.214,       // Dagavgift för helg
  "nightw": 0.214      // Nattavgift för helg
}
```

8. Konfigurera skriptets parametrar. Konfigurationshjälp finns inne i skriptet.

### 🔧 → [Felsökning](./Felsokning.md)

## Exempel på huvudgränssnitt
Här är en illustration av UI (status):
<table><tr>
<td><img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/StatP.jpg" width="500"></td>
</tr></table>


## Gränssnitt och flikar

Den inbyggda HTTP-servern på Shelly-enheten ger tillgång till fyra flikar:

| Flik | Funktion |
|------|-----------|
| **Status** | Visar aktuell driftstatus, genomsnittspris, tidsserier och utgångar. |
| **History** | Logg över tidigare kommandon och tillstånd per instans. |
| **Setup** | Inställningar för zon, läge, moms, tariff och utgångar. |
| **Help** | Kort dokumentation och tips direkt i webbläsaren. |

---

## Funktionalitet i version [shelly-elprisSE](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elprisSE.js)
- Kompatibel med Shelly Plus 1 / 1PM / Plug S / Pro 3 m.fl.  
- JSON-API används direkt från `se.elpris.eu` (ersätter elprisetjustnu.se).  
- Automatisk uppdatering av priser för idag och imorgon (om tillgängligt).  
- Slumpmässig minutfördröjning (20–50 min) sprider nätbelastningen mellan enheter.  
- Skriptet hämtar data direkt från proxyservern se.elpris.eu/api/v1/prices/ i det kompakta avg24-formatet, som redan sammanställer 96 kvartstimmar till 24 timmar.  
- Inbyggd hantering av nätavgifter (grid fees) med separata nivåer för vardag/helg och dag/natt (06–22 / 22–06).  
- Automatisk tillämpning av moms (VAT) och aktuell nättariff på varje prisintervall.  
- Centraliserad tidshantering med gemensam epoch-referens (_.s.now) och verifierad systemtid.  
- Full kompatibilitet med sommar- och vintertid (23 / 25-timmarsdygn identifieras och loggas korrekt).  
- För varje instans beräknas lägsta, högsta, genomsnittligt pris samt aktuell timme.  
- Antalet instanser har reducerats från tre till två för att minska minnesanvändningen och frigöra resurser för framtida utveckling av stöd för 15-minutersintervall.  
- Stöd för tre driftlägen: manuellt, tröskelvärdesstyrt och billigaste timmar per period.  
- Utgångar kan grupperas och styras enligt konfiguration via webb-UI eller HTTP-API.  
- Historik per instans med senaste statusändringar (upp till 12 poster för minnesoptimering).  
- Konfigurationer sparas lokalt i KVS och kan uppdateras dynamiskt via fliken Setup.  
- Förbättrat webbgränssnitt med flikar Status, History, Setup och Help, tillgängligt direkt via enhetens IP-adress.  
- Tidsintervall och beräkningar av "Grid fees" följer svenska elnätsmodeller med tydlig skillnad mellan vardag och helg.  
- Tid för API-hämtning konfigureras via variabel `ah` (standard kl. 15).  
- Minut för förfrågan väljs slumpmässigt vid första uppstart för att sprida nätbelastningen mellan enheter.

---

## 📢 API på GitHub för version shelly-elpris3.1.2SEg
Stödet för denna version avslutas den 15 december 2025. Vänligen uppdatera till den senaste versionen [shelly-elprisSE](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elprisSE.js).

## 📢 Kvartspriser från API
Från och med **1 oktober 2025** levererar [elprisetjustnu.se](https://www.elprisetjustnu.se/) priser i **15-minutersintervall (96 datapunkter per dygn)** i stället för 24 timpriser.  
Det innebär att de tidigare versionerna inte längre fungerar.  
Den nya versionen **shelly-elprisSE (3.1.3)** är anpassad till det nya formatet.  
För att Shelly-enheter med begränsat minne ska kunna hantera informationen aggregerar API:t automatiskt 96 kvartstimmar till 24 hela timmar.  
Detta är en **övergångslösning**. Utvecklingen fortsätter för att i framtiden stödja 96-intervall mer direkt.

## Huvudsakliga ändringar (se mer i [changelog](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/CHANGELOG.md)):
- **API-anrop:**  
  Ändrat från den estniska API-adressen i `.csv`-format ([Elering](https://elering.ee/)) till den svenska i JSON-format ([Elprisetjustnu.se](https://www.elprisetjustnu.se/)).  
- **Regioner:**  
  Stöd för svenska elområden SE1–SE4 har lagts till, medan Finland och Baltikum har tagits bort.  
- **Design:**  
  Justeringar av färgscheman och rubriker i flikarna *Status* och *Settings* för att bättre passa den svenska marknaden.

---
Skriptet utvecklat av [@Soviet9773Red](https://github.com/Soviet9773Red) med stort tack till [Jussi Isotalo](https://github.com/jisotalo) för originalkoden och [Mikael Ulvesjo](https://github.com/MikaelUlvesjo) för idéer kring JSON-optimering.

## Stöd projektet
Ditt stöd ger mig inte bara kaffe i koppen –  
det hjälper också till att hålla [elpris.eu](https://elpris.eu) och dess proxy-tjänster online,  
så att Shelly-skripten kan fortsätta få uppdaterade elprisdata.

[![Support Project](https://img.shields.io/badge/Stöd%20projektet-%F0%9F%8D%94%20Buy%20Me%20a%20Coffee-yellow?style=for-the-badge)](https://buymeacoffee.com/soviet9773red)

Tack!
