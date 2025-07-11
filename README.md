SE1-4 Nordpool elbörspris (spotpris) för Shelly-enheter: **shelly-elprisSE**

[![Licens: AGPL v3](https://img.shields.io/badge/Licens-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**shelly-elprisSE** är ett script för Shelly-enheter (Plus/Pro/Plug S) som styr utgångar baserat på Nordpools timpriser i svenska elområden SE1–SE4. Priser hämtas från [elprisetjustnu.se](https://www.elprisetjustnu.se/) via deras öppna JSON-API.

Utvecklat av [@Soviet9773Red](https://github.com/Soviet9773Red), med stort tack till [Jussi Isotalo](https://github.com/jisotalo) för den ursprungliga logiken, till [Mikael Ulvesjo](https://github.com/MikaelUlvesjo) för idén till effektiv prisparsning, samt till GPT4o/o1 för flerstegsutveckling, refaktorering och testning.

## Funktionalitet i version [shelly-elpris3.1.2SE.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elpris3.1.2SE.js)
- Automatisk hämtning och analys av elpriser för idag och imorgon (när tillgängligt).
- Centraliserad tidshantering med gemensam epoch-referens (`_.s.now`).
- Kompatibilitet med sommar-/vintertid (24 datapunkter behålls genom förenklad hantering).
- För varje instans analyseras lägsta, högsta, genomsnittligt elpris samt aktuell timme.
- Anpassningsbar logik för att slå på utgångar under billigaste timmarna, eller enligt tröskelvärden.
- Utgångarna styrs enligt konfiguration via GUI eller HTTP API.
- Full historik för varje instans (max 12 datapunkter för minnesoptimering).
- Inställningarna sparas lokalt i KVS.
- Endpoint-meny för visning och styrning via webbläsare, med förfinade beskrivningar (ex: "High price interval").
- Tidsintervall för "Transfer fees" ändrat till 06–22 för att spegla svenska elnätsaktörers tariffzoner.

## Tekniska egenskaper
- Kräver firmware **v1.5.1** eller nyare.
- Kompatibel med Shelly Plus 1 / 1PM / Plug S / Pro 3 m.fl.
- Kod optimerad för enheter med begränsat RAM (inga arrow-funktioner, minimalt minnesavtryck).
- JSON-API används istället för CSV (till skillnad från Elering).
- Tid för API-hämtning konfigureras via variabel `ah` (standard kl. 14).
- Minut för förfrågan väljs slumpmässigt vid första uppstart för att sprida nätbelastning mellan enheter.
- HTTP endpoint: fliken "Outputs" har bytt namn till "Config".

---

**shelly-elprisSE** är en svensk anpassning av det finska projektet **[shelly Porssisahko](https://github.com/jisotalo/shelly-porssisahko)**, ursprungligen utvecklat för Finland och Baltikum.  Denna version använder det svenska elpris-API:t [Elprisetjustnu.se](https://www.elprisetjustnu.se/) istället för [Elering](https://elering.ee/) standarddata.

Observera att inga globala ändringar har gjorts i funktionaliteten jämfört med originalkoden från [shelly-porssisahko-en (3.1.1)](https://github.com/jisotalo/shelly-porssisahko-en) För en fullständig manual, se [originalkällan.](https://github.com/jisotalo/shelly-porssisahko-en)

### 📢 Viktigt meddelande om 3.1.2SE-versionen

Observera att version 3.1.2SE är avsedd för användning med nuvarande API-struktur med timpriser (24 timmar).  
Elprisetjustnu.se planerade att införa 15-minutersprisformat från och med 12 juni 2025, men detta är nu framflyttat till **30 september 2025**, med första leveransdag **1 oktober 2025**.

➡️ Vid förändring av API-strukturen kommer shelly-elprisSE att anpassas efter de nya formaten när dessa är kända och tillgängliga.  
Uppdateringar av skriptet planeras att göras i takt med att förändringarna genomförs i praktiken.

Tills dess rekommenderas version **3.1.2SE** som stabil version för alla användare.

---

## Komma igång
1. Anslut din Shelly-enhet till nätverket.
2. Uppgradera firmware till senaste **stable** version ≥ 1.5.1.
3. Välj tidszon: **Europe/Stockholm** (viktigt för rätt prislogik).
4. Skapa nytt script i Shelly Web UI, klistra in senaste version [shelly-elpris3.1.2SE.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elpris3.1.2SE.js).
5. Starta scriptet och öppna konsolen för att se resultat och HTTP-länk.
6. Oppna länken från konsolen. I konsolen kommer du att se skriptets resultat, ungefär så här:

elpris-SE: v.3.1.2SE<br>
elpris-SE: URL: http://192.168.8.200/script/2<br>

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/console.png?raw=true" width="500">

7. Öppna skriptets HTTP-endpoint<br>
Kopiera HTTP-adressen från konsolen.
Öppna länken i en ny flik i din webbläsare.<br>
Adressen kan skilja sig, se exact i din consol
   
8. Konfigurera skriptets parametrar enligt [manualen](https://github.com/jisotalo/shelly-porssisahko-en)

### ? 🔧 →  [Felsökning. ](./Felsokning.md)

<br>

  ## 📷 Inställningsvy
Här är en illustration av info (status) och konfigurationsvyn:
<table><tr>
      <td><img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/StatP.jpg" width="500"></td>
      <td><img src="https://raw.githubusercontent.com/Soviet9773Red/shelly-elprisSE/main/SetP.jpg" width="500"></td>
    </tr>
</table>

---

## Huvudsakliga [ändringar](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/CHANGELOG.md):

- **API-anrop:**  
  Ändrat från den estniska API-adressen i `.csv`-format ([Elering](https://elering.ee/)) till den svenska i JSON-format ([Elprisetjustnu.se](https://www.elprisetjustnu.se/)).  
- **Regioner:**  
  Stöd för svenska elområden SE1-SE4 har lagts till, medan Finland och Baltikum har tagits bort.  
- **Design:**  
  Justeringar av färgschema och rubriker i flikarna *Status* och *Settings* för att bättre passa den svenska marknaden.

 Mer information finns i [changelog.md](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/CHANGELOG.md).

För detaljerad dokumentation om originalfunktioner hänvisas till [jisotalos README](https://github.com/jisotalo/shelly-porssisahko-en).

---

## Stöd projektet
Jag är ofta hungrig när jag kodar – 🍔 [bjud mig på en Big Mac och kaffe](https://buymeacoffee.com/soviet9773red)

[![Big Mac](https://img.shields.io/badge/Buy%20me%20a%20🍔-Big%20Mac-yellow?style=for-the-badge)](https://buymeacoffee.com/soviet9773red)

Tack!
