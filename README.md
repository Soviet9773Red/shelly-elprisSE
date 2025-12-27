# SE1-4 Nordpool elbörspris (spotpris) för Shelly-enheter: **shelly-elprisSE**

[![Licens: AGPL v3](https://img.shields.io/badge/Licens-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**shelly-elprisSE** är ett script för Shelly-enheter Gen 2 (Plus/Pro/Plug S) som styr utgångar baserat på Nordpools spotpriser i svenska elområden SE1-SE4. Projektet är en svensk vidareutveckling av det finska **[shelly Porssisahko](https://github.com/jisotalo/shelly-porssisahko)**, ursprungligen skapat för Finland och Baltikum.  I tidigare versioner hämtades priserna från elprisetjustnu.se via deras öppna JSON-API, men ny används en proxykälla [elpris.eu](https://elpris.eu) - för stabil och effektiv hämtning av elpriser i det kompakta `avg24`-formatet.

### **Version 3.1.5 primary supports Shelly platform Gen2**
```
| Device   | Gen 2      | Gen 3:            |
|----------|------------|-------------------|
| Plus1    | OK         | Not tested        |
| Plus1 PM | OK         | Not tested        |
| Plus2 PM | OK         | Not tested        |
| Pro 2    | OK         | Not tested        |
| Pro 3    | OK         | Not tested        |
| Plug S   | OK         | Shows instability |
| Mini PM  | Not tested | Shows instability |

Shelly Gen 3-4:
- may work
- not fully tested
- memory constraints may cause instability
```

**Shelly-elprisSE 3.1.5 Release Notes**

**Höjdpunkter**  
⚡ Stöd för 15-minutersdata - automatisk aggregering (96 → 24) för kompatibilitet med timbaserad logik.  
⚙️ Förbättrade gränssnitt för Status, History och Setup.  
💰 Modell för nätavgifter - tydlig vardag/helg-separation samt dynamisk avgiftsdetektering beroende på tid på dygnet, inklusive buggfixar.  
🆘 Integrerad Help-flik med inbyggd dokumentation, direkt tillgänglig via webbgränssnittet.  
🪄 Ombyggt användargränssnitt - tydligare tabeller, förbättrad layout och responsiv design för mobil användning.  
🔧 Förbättrad prishantering - stabil tolkning av avg24-formatet med validering för sommar- och vintertid (23/25-timmarsdygn).  
🧩 Buggrättningar: korrigerad logik vid dygnsbyte, momsberäkning, återställd override-persistens samt korrekt visning av aktuellt spotpris.   
🌡️ Stöd för H&T-temperatursensor via addon-skript för dynamisk justering av billigaste timmar.

---

## Komma igång
1. Anslut din Shelly-enhet till nätverket.  
2. Uppgradera firmware till senaste **stable** version ≥ 1.7.1.  
3. Välj tidszon: **Europe/Stockholm** (viktigt för korrekt prislogik).
   
4. Skapa ett nytt script i Shelly Web UI och klistra in den senaste [3.1.5 build 04] versionen [shelly-elprisSE.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elprisSE.js).  

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/console.jpg?raw=true" width="426"
  align="right"
     style="margin-right:15px; margin-bottom:10px;">
5. Starta scriptet och öppna konsolen för att se resultatet och HTTP-länken.  
6. Öppna länken från konsolen. Du ser något i stil med:  

```
elpris-SE: v.3.1.5_04
elpris-SE: URL http://192.168.8.119/script/1
```

7. Öppna skriptets HTTP-endpoint.  
Kopiera HTTP-adressen från konsolen och öppna länken i en ny flik i din webbläsare.  
Adressen kan skilja sig – se den exakta adressen i konsolen.

Observera att siffran efter script/ visar skriptnumret och kan variera, till exempel /script/2 eller /script/3 osv. Se aktuellt nummer för ditt skript.
<br clear="all">

**Viktigt:** I version 3.1.5 har strukturen för KVS-nycklar ändrats och konfiguration **#3** har tagits bort.  
Innan du startar den nya versionen bör du ta bort gamla KVS-nycklar, eftersom även deras interna struktur har uppdaterats.  

8. Konfigurera skriptets parametrar. Konfigurationshjälp finns inne i skriptet.

### 🔧 → [Felsökning](./Felsokning.md)

### Exempel på huvudgränssnitt
Här är en illustration av UI (status):
<table><tr>
<td><img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/statp.jpg" width="515"></td>
</tr></table>


### **Gränssnitt och flikar**
Den inbyggda HTTP-servern på Shelly-enheten ger tillgång till fyra flikar:

| Flik | Funktion |
|------|-----------|
| **Status** | Visar aktuell driftstatus, genomsnittspris, tidsserier och utgångar. |
| **History** | Logg över tidigare kommandon och tillstånd per instans. |
| **Setup** | Inställningar för zon, läge, moms, tariff och utgångar. |
| **Help** | Kort dokumentation och tips direkt i webbläsaren. |

---

### **Funktionalitet i version 3.1.5** [shelly-elprisSE](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elprisSE.js)

-Förbättrad intern stabilitet genom flera riktade patchar i kärnlogiken<br>
-Utökad History-funktion med datumvisning för tydligare tidskontext<br>
-Förfinat användargränssnitt i samtliga flikar med fokus på läsbarhet och visuell konsekvens<br>
-Stabilare hantering av tillstånd och prisdata vid uppdateringar och dygnsövergångar<br>
-Förbättrad samverkan mellan Status- och Setup-vyer utan förändring av grundläggande beteende<br>
-Stöd för H&T-temperatursensor via addon-skript för dynamisk justering av billigaste timmar<br>

I version 3.1.5 har strukturen för KVS-nycklar ändrats och konfiguration **#3** har tagits bort.  
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
---

### H&T temperature sensor support

Ett tillval i form av ett addon-skript kan användas tillsammans med shelly-elprisSE.
Addon-skriptet laddas efter huvudskriptet och använder temperaturdata från en Shelly H&T-sensor
för att dynamiskt justera antalet billigaste timmar.

Addonet finns i katalogen:
shelly-elprisSE/addons/[ht-sensor-addon.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/addons/README.md)

## 📢 Kvartspriser från API
Från och med **1 oktober 2025** levererar [elprisetjustnu.se](https://www.elprisetjustnu.se/) priser i **15-minutersintervall (96 datapunkter per dygn)** i stället för 24 timpriser.  
Det innebär att de tidigare versionerna inte längre fungerar.  
Den nya versionen **shelly-elprisSE (3.1.5)** är anpassad till det nya formatet.  
För att Shelly-enheter med begränsat minne ska kunna hantera informationen aggregerar API:t automatiskt 96 kvartstimmar till 24 hela timmar.  
Detta är en **övergångslösning**. Utvecklingen fortsätter för att i framtiden stödja 96-intervall mer direkt.

## Huvudsakliga ändringar (se mer i [changelog](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/CHANGELOG.md)):
- **API-anrop:**  
  Ändrat från den estniska API-adressen i `.csv`-format ([Elering](https://elering.ee/)) till den svenska i JSON-format ([elpris.eu](https://elpris.eu/)).  
- **Regioner:**  
  Stöd för svenska elområden SE1–SE4 har lagts till, medan Finland och Baltikum har tagits bort.  
- **Design:**  
  Justeringar av färgscheman och rubriker i flikarna *Status* och *Settings* för att bättre passa den svenska marknaden.

---
Skriptet utvecklat av [@Soviet9773Red](https://github.com/Soviet9773Red) med stort tack till [Jussi Isotalo](https://github.com/jisotalo) för originalkoden och [Mikael Ulvesjo](https://github.com/MikaelUlvesjo) för idéer kring JSON-optimering.

### Källkod och byggsystem

För närvarande är källkoden, relaterade projekt samt bygg- och npm-baserad arbetsmiljö
inte publikt tillgängliga. Vid intresse för fork, anpassningar eller vidareutveckling kan dessa göras tillgängliga vid behov.    
Kontakta mig gärna via GitHub Issues eller via projektets kontaktytor.

## Stöd projektet
Ditt stöd ger mig inte bara kaffe i koppen –  
det hjälper också till att hålla [elpris.eu](https://elpris.eu) och dess proxy-tjänster online,  
så att Shelly-skripten kan fortsätta få uppdaterade elprisdata.

[![Support Project](https://img.shields.io/badge/Stöd%20projektet-%F0%9F%8D%94%20Buy%20Me%20a%20Coffee-yellow?style=for-the-badge)](https://buymeacoffee.com/soviet9773red)

Tack!
