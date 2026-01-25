# SE1-4 Nordpool elbörspris (spotpris) för Shelly-enheter: **shelly-elprisSE**

[![Licens: AGPL v3](https://img.shields.io/badge/Licens-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**shelly-elprisSE** är ett script för Shelly-enheter Gen 2 (Plus/Pro/Plug S) som styr utgångar baserat på Nordpools spotpriser i svenska elområden SE1-SE4. Projektet är en svensk vidareutveckling av det finska **[shelly Porssisahko v3.1.1](https://github.com/jisotalo/shelly-porssisahko-en/releases/tag/v.3.1.1)**, ursprungligen skapat för Finland och Baltikum.  I tidigare versioner hämtades priserna från elprisetjustnu.se via deras öppna JSON-API, men ny används en proxykälla [elpris.eu](https://elpris.eu) - för stabil och effektiv hämtning av elpriser i det kompakta `avg24`-formatet.

### **Version 3.1.5 primary supports Shelly platform Gen2**
```
| Device   | Gen 2 | Gen 3 | Gen 4 |
|----------|-------|-------|-------|
| Plus 1   |  OK   |  --   |  --   |
| Plus 1PM |  OK   |  --   |  OK   |
| Plus 2PM |  OK   |  --   |  --   |
| Pro 1 V1 |  OK   |  --   |  --   |
| Pro 2    |  OK   |  --   |  --   |
| Pro 3    |  OK   |  --   |  --   |
| Plug S   |  OK   |  OK   |  --   |
| Plug M   |  --   |  --   |  --   |
| Mini PM  |  --   |  SI   |  --   |

-- = Not tested , SI = Shows instability
```

*Shelly Gen3, Gen4-enheter stöds, men kräver att **Matter är avstängt***.

---

## Shelly-elprisSE 3.1.5 Release Notes

**Höjdpunkter**  
⚡ Stöd för 15-minuterspriser via API med timbaserad aggregering (96 → 24).    
⚙️ Förbättrade gränssnitt för Status, History och Setup.  
💰 Modell för nätavgifter - tydlig vardag/helg-separation samt dynamisk avgiftsdetektering beroende på tid på dygnet, inklusive buggfixar.  
🆘 Integrerad Help-flik med inbyggd dokumentation, direkt tillgänglig via webbgränssnittet.  
🪄 Ombyggt användargränssnitt - tydligare tabeller, förbättrad layout och responsiv design för mobil användning.  
🔧 Förbättrad prishantering - stabil tolkning av avg24-formatet med validering för sommar- och vintertid (23/25-timmarsdygn).  
🧩 Buggrättningar: korrigerad logik vid dygnsbyte, momsberäkning, återställd override-persistens samt korrekt visning av aktuellt spotpris.   
🌡️ Stöd för H&T-temperatursensor via addon-skript för dynamisk justering av billigaste timmar.



## Komma igång
1. Anslut din Shelly-enhet till ditt nätverk och kontrollera att den är åtkomlig via Shelly Web UI.
2. Uppgradera firmware till senaste **stable** version ≥ 1.7.1.  
3. Välj tidszon: **Europe/Stockholm** (viktigt för korrekt prislogik).
   
4. Öppna Scripts i Shelly Web UI, skapa ett nytt script och klistra in den senaste [3.1.5 build 04] versionen av [shelly-elprisSE.js](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/shelly-elprisSE.js).  

<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/console.jpg?raw=true" width="426"
  align="right"
     style="margin-right:15px; margin-bottom:10px;">

5. Namnge skriptet till *shelly-elprisSE* och klicka på Save → Start.
   

6. I konsolen (Console) visas informationsmeddelanden samt skriptets HTTP-adress, till exempel: 

```
elpris-SE: v.3.1.5_04
elpris-SE: URL http://192.168.8.119/script/1
```

7. Markera och kopiera HTTP-adressen från konsolen.<br>
Adressen är inte klickbar i konsolen.<br>
Öppna en ny flik i din webbläsare (Chrome, Firefox, Edge osv.), klistra in adressen i adressfältet och öppna den.


Adressen kan skilja sig – använd alltid den exakta adress som visas i konsolen.
<br>
Observera att siffran efter script/ visar skriptnumret och kan variera, till exempel /script/2 eller /script/3 osv. Se aktuellt nummer för ditt skript.
<br clear="all">
<br>

8. Konfigurera skriptets parametrar via webbgränssnittet.
<img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/configEnable.jpg" width="353"
  align="right"
     style="margin-right:10px; margin-bottom:10px;">

   Observera att konfigurationen är inaktiverad som standard vid första uppstart.
   För att aktivera den, gå till Setup, markera Enabled och klicka på Save.
   Ytterligare konfigurationshjälp finns i fliken Help.
   
<br clear="all">

**Viktigt:** I version 3.1.5 har strukturen för KVS-nycklar ändrats och konfiguration **#3** har tagits bort.  
Innan du startar den nya versionen bör du ta bort gamla KVS-nycklar, eftersom även deras interna struktur har uppdaterats.  

---


### Exempel på huvudgränssnitt
Här är en illustration av UI (status):
<table><tr>
<td><img src="https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/img/statp.jpg" width="521"></td>
</tr></table>


### **Gränssnitt och flikar**
Den inbyggda HTTP-servern på Shelly-enheten ger tillgång till fyra flikar:

| Flik | Funktion |
|------|-----------|
| **Status** | Visar aktuell driftstatus, genomsnittspris, tidsserier och utgångar. |
| **History** | Logg över tidigare kommandon och tillstånd per instans. |
| **Setup** | Inställningar för zon, läge, moms, tariff och utgångar. |
| **Help** | Kort dokumentation och tips direkt i webbläsaren. |



### 🌡️ H&T temperature sensor support

Ett tillval i form av ett addon-skript kan användas tillsammans med *shelly-elprisSE*.
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

## Huvudsakliga ändringar:
- **API-anrop:**  
  Ändrat från den estniska API-adressen i `.csv`-format ([Elering](https://elering.ee/)) till den svenska i JSON-format ([elpris.eu](https://elpris.eu/)).  
- **Regioner:**  
  Stöd för svenska elområden SE1–SE4 har lagts till, medan Finland och Baltikum har tagits bort.  
- **Design:**  
  Justeringar av färgscheman och rubriker i flikarna *Status* och *Settings* för att bättre passa den svenska marknaden.
  
Se detaljer i [CHANGELOG.md](https://github.com/Soviet9773Red/shelly-elprisSE/blob/main/CHANGELOG.md)


---

Skriptet utvecklat av [@Soviet9773Red](https://github.com/Soviet9773Red) med stort tack till [Jussi Isotalo](https://github.com/jisotalo) för originalkoden och [Mikael Ulvesjo](https://github.com/MikaelUlvesjo) för idéer kring JSON-optimering.

### Källkod och byggsystem

För närvarande är källkoden, relaterade projekt samt bygg- och npm-baserad arbetsmiljö
inte publikt tillgängliga. Vid intresse för fork, anpassningar eller vidareutveckling kan dessa göras tillgängliga vid behov.    
Kontakta mig gärna via GitHub Issues eller via projektets kontaktytor.

---

### Visuell översikt [shelly-device-map](https://github.com/Soviet9773Red/shelly-device-map) (valfritt)

Om detta skript används på flera Shelly-enheter kan det vara praktiskt att komplettera med en enkel visuell översikt.

Projektet **[shelly-device-map](https://github.com/Soviet9773Red/shelly-device-map)** erbjuder en lättviktig, statisk HTML-sida där enheter kan placeras på en planritning och länkas via sina lokala IP-adresser. Det ger snabb och tydlig åtkomst till Shelly Web UI, körande skript och status-endpoints från en och samma vy.

Shelly Device Map ([demo](https://soviet9773red.github.io/shelly-device-map/)) är helt statisk, kräver ingen backend och kan öppnas lokalt eller köras på till exempel en Raspberry Pi.

---
### 🔧 → [Felsökning](./Felsokning.md)

## Stöd projektet
Ditt stöd ger mig inte bara kaffe i koppen – det hjälper också till att hålla [elpris.eu](https://elpris.eu) och dess proxy-tjänster online,  
så att Shelly-skripten kan fortsätta få uppdaterade elprisdata.

[![Support Project](https://img.shields.io/badge/Stöd%20projektet-%F0%9F%8D%94%20Buy%20Me%20a%20Coffee-yellow?style=for-the-badge)](https://buymeacoffee.com/soviet9773red)

Tack!
